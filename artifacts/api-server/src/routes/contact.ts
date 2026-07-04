import { Router, type IRouter } from "express";
import { SubmitContactFormBody, ContactResponse, ErrorResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactFormBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid contact form submission");
    res.status(400).json({ error: parsed.error.message } satisfies ErrorResponse);
    return;
  }

  const { name, email, phone, company, message } = parsed.data;

  req.log.info({ name, email, phone, company, message }, "Contact form submission received");

  // TODO: Implement email delivery using Resend when RESEND_API_KEY is available.
  // Check process.env.RESEND_API_KEY and use it if present.
  
  res.status(200).json({ ok: true } satisfies ContactResponse);
});

export default router;
