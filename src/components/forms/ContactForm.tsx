"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";
import type { Dictionary, FormStatus, ContactFormData } from "@/types";

interface Props {
  dict: Dictionary;
}

function validate(
  data: ContactFormData,
  dict: Dictionary,
): Partial<Record<keyof ContactFormData, string>> {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};
  const v = dict.contact.validation;

  if (!data.name.trim()) errors.name = v.nameRequired;
  if (!data.email.trim()) errors.email = v.emailRequired;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = v.emailInvalid;
  if (!data.subject.trim()) errors.subject = v.subjectRequired;
  if (!data.message.trim()) errors.message = v.messageRequired;
  if (!data.consent) errors.consent = v.consentRequired;

  return errors;
}

const formContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center text-center gap-4 py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">
          <CheckCircle2
            size={32}
            className="text-amber-500"
            aria-hidden="true"
          />
        </div>
        <h3 className="font-serif font-bold text-slate-900 text-2xl">
          {c.formSuccessTitle}
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-md">
          {c.formSuccessBody}
        </p>
      </motion.div>
    );
  }

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-white border ${
      hasError ? "border-red-500" : "border-slate-200"
    } rounded-sm focus:border-amber-500 focus:ring-0 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-sans text-sm`;

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-label={c.formTitle}
      variants={formContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={formItemVariants}>
        <h2 className="font-serif font-bold text-slate-900 text-3xl mb-2 tracking-tight">
          {c.formTitle}
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          Reach out to our dedicated teams for specialized assistance.
        </p>
      </motion.div>

      {status === "error" && (
        <motion.div
          variants={formItemVariants}
          role="alert"
          className="flex items-start gap-3 p-4 rounded-sm border border-red-500/30 bg-red-500/5"
        >
          <AlertCircle
            size={18}
            className="shrink-0 mt-0.5 text-red-500"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-red-500">
              {c.formErrorTitle}
            </p>
            <p className="text-sm text-slate-600">{c.formErrorBody}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <motion.div
          variants={formItemVariants}
          className="flex flex-col gap-1.5"
        >
          <label
            htmlFor="contact-name"
            className="text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            {c.formName} *
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            className={inputClasses(!!errors.name)}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div
          variants={formItemVariants}
          className="flex flex-col gap-1.5"
        >
          <label
            htmlFor="contact-email"
            className="text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            {c.formEmail} *
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            className={inputClasses(!!errors.email)}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phone */}
        <motion.div
          variants={formItemVariants}
          className="flex flex-col gap-1.5"
        >
          <label
            htmlFor="contact-phone"
            className="text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            {c.formPhone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            dir="ltr"
            className={inputClasses(false)}
          />
        </motion.div>

        {/* Subject (Dropdown) */}
        <motion.div
          variants={formItemVariants}
          className="flex flex-col gap-1.5"
        >
          <label
            htmlFor="contact-subject"
            className="text-xs font-bold uppercase tracking-widest text-slate-500"
          >
            {c.formSubject} *
          </label>
          <div className="relative">
            <select
              id="contact-subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.subject}
              className={`${inputClasses(!!errors.subject)} appearance-none cursor-pointer pr-10`}
            >
              <option value="" disabled>
                Select inquiry type
              </option>
              <option value="Distribution & International Partnerships">
                Distribution & International Partnerships
              </option>
              <option value="Brand Representation & Procurement">
                Brand Representation & Procurement
              </option>
              <option value="Careers & Human Capital">
                Careers & Human Capital
              </option>
              <option value="General Corporate Inquiries">
                General Corporate Inquiries
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.subject && (
            <p role="alert" className="text-xs text-red-500">
              {errors.subject}
            </p>
          )}
        </motion.div>
      </div>

      {/* Message */}
      <motion.div variants={formItemVariants} className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-xs font-bold uppercase tracking-widest text-slate-500"
        >
          {c.formMessage} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          className={`${inputClasses(!!errors.message)} resize-none`}
        />
        {errors.message && (
          <p role="alert" className="text-xs text-red-500">
            {errors.message}
          </p>
        )}
      </motion.div>

      {/* Consent */}
      <motion.div variants={formItemVariants}>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            id="contact-consent"
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.consent}
            className="mt-1 w-4 h-4 shrink-0 rounded-sm border-slate-300 text-amber-500 focus:ring-amber-500 transition-colors"
          />
          <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
            {c.formConsent}
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="text-xs text-red-500 mt-1">
            {errors.consent}
          </p>
        )}
      </motion.div>

      {/* Submit */}
      <motion.div variants={formItemVariants} className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full lg:w-auto px-10 py-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-amber-500 transition-colors duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          {status === "submitting" ? "Processing..." : c.formSubmit}
        </button>
      </motion.div>
    </motion.form>
  );
}
