import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { SubmitContactFormBody, ContactResponse, ErrorResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const TO_EMAIL = "customercare@ocsoorja.com";
const FROM_EMAIL = "OCS OORJA Website <onboarding@resend.dev>";

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactFormBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form submission");
    res.status(400).json({ error: parsed.error.message } satisfies ErrorResponse);
    return;
  }

  const { name, email, phone, company, message } = parsed.data;

  req.log.info({ name, email, phone, company }, "Contact form submission received");

  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: email,
        subject: `New Quote / Contact Request from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
            <div style="background:#14532d;padding:16px 24px;border-radius:6px 6px 0 0;margin:-24px -24px 24px;">
              <img src="https://ocsoorja.com/images/OCS_OORJA_logo_landscape.png" alt="OCS OORJA" style="height:40px;" />
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
            <p style="font-size:12px;color:#9ca3af;margin:0;">Submitted via ocsoorja.com contact form. Reply directly to this email to respond to ${name}.</p>
          </div>
        `,
      });

      if (error) {
        req.log.error({ error }, "Resend delivery failed");
      } else {
        req.log.info({ to: TO_EMAIL }, "Contact email sent via Resend");
      }
    } catch (err) {
      req.log.error({ err }, "Resend threw an exception");
    }
  } else {
    req.log.warn("RESEND_API_KEY not set — email not sent");
  }

  res.status(200).json({ ok: true } satisfies ContactResponse);
});

export default router;
