import { Router, type IRouter } from "express";
import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { Resend } from "resend";
import { db, enquiriesTable } from "@workspace/db";
import { SubmitContactFormBody, ContactResponse, ErrorResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
  statusCode: 429,
  keyGenerator: (req) => ipKeyGenerator(req) ?? "unknown",
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = "OCS OORJA <noreply@ocsoorja.com>";
const TO_BUSINESS = "customercare@ocsoorja.com";

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------

function notificationHtml(name: string, email: string, phone: string | undefined, company: string | undefined, message: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
      <div style="background:#14532d;padding:16px 24px;border-radius:6px 6px 0 0;margin:-24px -24px 24px;">
        <p style="color:#fff;font-size:18px;font-weight:700;margin:0;">OCS OORJA — New Enquiry</p>
      </div>
      <h2 style="color:#14532d;margin-top:0;">New Quote / Contact Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;width:120px;font-size:14px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#14532d;">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#14532d;">${phone}</a></td></tr>` : ""}
        ${company ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ""}
      </table>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
      <h3 style="color:#374151;margin-bottom:8px;">Message</h3>
      <p style="background:#f9fafb;padding:16px;border-radius:6px;margin:0;white-space:pre-wrap;color:#374151;">${message}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
      <p style="font-size:12px;color:#9ca3af;margin:0;">Submitted via ocsoorja.com. Reply directly to this email to respond to ${name}.</p>
    </div>
  `;
}

function confirmationHtml(name: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
      <div style="background:#14532d;padding:16px 24px;border-radius:6px 6px 0 0;margin:-24px -24px 24px;">
        <p style="color:#fff;font-size:18px;font-weight:700;margin:0;">OCS OORJA</p>
      </div>
      <h2 style="color:#14532d;">Thank you, ${name}!</h2>
      <p style="color:#374151;">We've received your enquiry and our team will get back to you within <strong>1 business day</strong>.</p>
      <p style="color:#374151;">In the meantime, you can explore our products or reach us directly:</p>
      <ul style="color:#374151;padding-left:20px;">
        <li>📞 <a href="tel:+917521803995" style="color:#14532d;">+91 75218 03995</a></li>
        <li>📧 <a href="mailto:customercare@ocsoorja.com" style="color:#14532d;">customercare@ocsoorja.com</a></li>
        <li>💬 WhatsApp: <a href="https://wa.me/917521803995" style="color:#14532d;">wa.me/917521803995</a></li>
      </ul>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
      <p style="font-size:12px;color:#9ca3af;margin:0;">OCS OORJA Green Private Limited · Lucknow, Uttar Pradesh · <a href="https://ocsoorja.com" style="color:#9ca3af;">ocsoorja.com</a></p>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

router.post("/contact", contactRateLimit, async (req, res): Promise<void> => {
  const parsed = SubmitContactFormBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form submission");
    res.status(400).json({ error: parsed.error.message } satisfies ErrorResponse);
    return;
  }

  const { name, email, phone, company, message } = parsed.data;

  // 1. Save to DB first — always, regardless of email outcome
  const [row] = await db
    .insert(enquiriesTable)
    .values({ name, email, phone: phone ?? null, company: company ?? null, message })
    .returning({ id: enquiriesTable.id });

  req.log.info({ enquiryId: row.id, name, email }, "Enquiry saved to database");

  if (!resend) {
    req.log.warn("RESEND_API_KEY not set — emails not sent");
    res.status(200).json({ ok: true } satisfies ContactResponse);
    return;
  }

  // 2. Send both emails in parallel
  const [notifResult, confirmResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: TO_BUSINESS,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: notificationHtml(name, email, phone, company, message),
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your enquiry — OCS OORJA",
      html: confirmationHtml(name),
    }),
  ]);

  // 3. Extract results and update DB row
  const notifOk = notifResult.status === "fulfilled" && !notifResult.value.error;
  const confirmOk = confirmResult.status === "fulfilled" && !confirmResult.value.error;

  const notifMsgId = notifOk ? (notifResult.value.data?.id ?? null) : null;
  const confirmMsgId = confirmOk ? (confirmResult.value.data?.id ?? null) : null;

  const errors: string[] = [];
  if (!notifOk) {
    const err = notifResult.status === "rejected"
      ? String(notifResult.reason)
      : JSON.stringify(notifResult.value.error);
    errors.push(`notification: ${err}`);
    req.log.error({ err }, "Notification email failed");
  }
  if (!confirmOk) {
    const err = confirmResult.status === "rejected"
      ? String(confirmResult.reason)
      : JSON.stringify(confirmResult.value.error);
    errors.push(`confirmation: ${err}`);
    req.log.error({ err }, "Confirmation email failed");
  }

  await db
    .insert(enquiriesTable)
    .values({
      id: row.id,
      name, email,
      phone: phone ?? null,
      company: company ?? null,
      message,
      notificationSent: notifOk,
      confirmationSent: confirmOk,
      notificationMsgId: notifMsgId,
      confirmationMsgId: confirmMsgId,
      emailError: errors.length ? errors.join(" | ") : null,
    })
    .onConflictDoUpdate({
      target: enquiriesTable.id,
      set: {
        notificationSent: notifOk,
        confirmationSent: confirmOk,
        notificationMsgId: notifMsgId,
        confirmationMsgId: confirmMsgId,
        emailError: errors.length ? errors.join(" | ") : null,
      },
    });

  req.log.info(
    { enquiryId: row.id, notifOk, confirmOk, notifMsgId, confirmMsgId },
    "Enquiry email delivery complete",
  );

  res.status(200).json({ ok: true } satisfies ContactResponse);
});

export default router;
