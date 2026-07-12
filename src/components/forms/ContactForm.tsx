"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { Dictionary, FormStatus, ContactFormData } from "@/types";

interface Props {
  dict: Dictionary;
}

function validate(data: ContactFormData, dict: Dictionary): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  const v = dict.contact.validation;

  if (!data.name.trim()) errors.name = v.nameRequired;
  if (!data.email.trim()) errors.email = v.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = v.emailInvalid;
  if (!data.subject.trim()) errors.subject = v.subjectRequired;
  if (!data.message.trim()) errors.message = v.messageRequired;
  if (!data.consent) errors.consent = v.consentRequired;

  return errors;
}

export default function ContactForm({ dict }: Props) {
  const c = dict.contact;
  const [form, setForm] = useState<ContactFormData & { phone: string }>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form, dict);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("submitting");

    // ─── Backend integration placeholder ─────────────────────────────────
    // Replace the timeout below with your actual API call, e.g.:
    // const res = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // if (!res.ok) { setStatus("error"); return; }
    // ────────────────────────────────────────────────────────────────────
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-12">
        <div className="w-14 h-14 rounded-full bg-[var(--color-bg-light-dim)] flex items-center justify-center">
          <CheckCircle2 size={28} className="text-[var(--color-success)]" aria-hidden="true" />
        </div>
        <h3 className="font-bold text-[var(--color-text-dark)] text-xl">{c.formSuccessTitle}</h3>
        <p className="text-[var(--color-text-dark-soft)]">{c.formSuccessBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label={c.formTitle}>
      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 p-4 rounded-lg border border-[var(--color-error)]/30 bg-[var(--color-error)]/5">
          <AlertCircle size={18} className="shrink-0 mt-0.5 text-[var(--color-error)]" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-error)]">{c.formErrorTitle}</p>
            <p className="text-sm text-[var(--color-text-dark-soft)]">{c.formErrorBody}</p>
          </div>
        </div>
      )}

      {/* Name */}
      <div className="form-field">
        <input
          id="contact-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder=" "
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "error-name" : undefined}
          className={errors.name ? "!border-[var(--color-error)]" : ""}
        />
        <label htmlFor="contact-name">{c.formName} *</label>
        {errors.name && (
          <p id="error-name" role="alert" className="mt-1 text-xs text-[var(--color-error)]">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="form-field">
        <input
          id="contact-email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder=" "
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={errors.email ? "!border-[var(--color-error)]" : ""}
        />
        <label htmlFor="contact-email">{c.formEmail} *</label>
        {errors.email && (
          <p id="error-email" role="alert" className="mt-1 text-xs text-[var(--color-error)]">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone (optional) */}
      <div className="form-field">
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder=" "
          autoComplete="tel"
          dir="ltr"
        />
        <label htmlFor="contact-phone">{c.formPhone}</label>
      </div>

      {/* Subject */}
      <div className="form-field">
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder=" "
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "error-subject" : undefined}
          className={errors.subject ? "!border-[var(--color-error)]" : ""}
        />
        <label htmlFor="contact-subject">{c.formSubject} *</label>
        {errors.subject && (
          <p id="error-subject" role="alert" className="mt-1 text-xs text-[var(--color-error)]">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="form-field">
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder=" "
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "error-message" : undefined}
          className={errors.message ? "!border-[var(--color-error)]" : ""}
        />
        <label htmlFor="contact-message">{c.formMessage} *</label>
        {errors.message && (
          <p id="error-message" role="alert" className="mt-1 text-xs text-[var(--color-error)]">
            {errors.message}
          </p>
        )}
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            id="contact-consent"
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "error-consent" : undefined}
            className="mt-0.5 shrink-0 w-4 h-4 rounded border-[var(--color-border-light)] text-[var(--color-text-dark)] focus:ring-[var(--color-focus)]"
          />
          <span className="text-sm text-[var(--color-text-dark-soft)]">{c.formConsent}</span>
        </label>
        {errors.consent && (
          <p id="error-consent" role="alert" className="mt-1 text-xs text-[var(--color-error)]">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Note */}
      <p className="text-xs text-[var(--color-text-muted)] italic">{c.formNote}</p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full px-6 py-3.5 bg-[var(--color-text-dark)] text-white font-semibold rounded-md hover:bg-[var(--color-text-dark-soft)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
      >
        {status === "submitting" ? "…" : c.formSubmit}
      </button>
    </form>
  );
}
