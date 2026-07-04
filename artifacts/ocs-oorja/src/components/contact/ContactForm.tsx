

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  company: z.string().min(2),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit");
      setStatus({ ok: true, msg: "Thanks! We'll get back to you soon." });
      reset();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setStatus({ ok: false, msg });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} aria-invalid={!!errors.phone} />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...register("company")} aria-invalid={!!errors.company} />
        {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>
      <div className="sm:col-span-2 mt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
      {status && (
        <div className={cn("sm:col-span-2 text-sm", status.ok ? "text-emerald-600" : "text-red-600")}>
          {status.msg}
        </div>
      )}
    </form>
  );
}
