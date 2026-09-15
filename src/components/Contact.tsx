"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { ArrowIcon } from "./Icons";
import { EASE, Reveal } from "./motion";
import { SectionHeader } from "./SectionHeader";
import { emailLink, socials } from "./socials";

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const links = [emailLink, ...socials].map(({ label, href, display, Icon }) => ({ label, href, value: display, Icon }));

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) nextErrors.name = "Please tell me your name.";
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) nextErrors.email = "That email does not look right.";
    if (!data.subject || data.subject.trim().length < 3) nextErrors.subject = "Add a short subject.";
    if (!data.message || data.message.trim().length < 10) nextErrors.message = "A few more words would help.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong while sending.");
      setStatus({ state: "sent" });
      form.reset();
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong while sending." });
    }
  }

  return (
    <section id="contact" className="section border-t border-line">
      <div className="wrap">
        <SectionHeader
          index="07"
          label="Contact"
          title="Have a system that needs building, fixing or connecting?"
          lede="Leave a subject and a message. It lands directly in my inbox and I reply to the address you give, usually within a working day."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <ul className="divide-y divide-line border-y border-line">
              {links.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 py-4 transition-colors hover:text-brass"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-brass">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[0.64rem] uppercase tracking-[0.12em] text-ink-faint">{label}</span>
                      <span className="block truncate text-[0.95rem] font-medium">{value}</span>
                    </span>
                    <ArrowIcon className="size-4 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.86rem] leading-relaxed text-ink-faint">
              Based in {profile.location}, GMT+8. Available for remote work and on-site engagements in Metro Manila.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              {/* honeypot: bots fill this, humans never see it */}
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <Field label="Your name" name="name" error={errors.name}>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Juan dela Cruz" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} required />
              </Field>
              <Field label="Your email" name="email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className="field" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} required />
              </Field>
              <Field label="Subject" name="subject" error={errors.subject} className="sm:col-span-2">
                <input id="subject" name="subject" type="text" placeholder="Business Central integration for our sales team" className="field" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} required />
              </Field>
              <Field label="Request or message" name="message" error={errors.message} className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="What are you building, what does it need to talk to, and when do you need it?"
                  className="field resize-y"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  required
                />
              </Field>

              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button type="submit" className="btn btn-primary" disabled={status.state === "sending"}>
                  {status.state === "sending" ? "Sending" : "Send message"}
                  <ArrowIcon className="size-4" />
                </button>
                <AnimatePresence mode="wait">
                  {status.state === "sent" && (
                    <motion.p
                      key="sent"
                      role="status"
                      className="text-[0.9rem] text-signal"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      Sent. Thank you, I will get back to you soon.
                    </motion.p>
                  )}
                  {status.state === "error" && (
                    <motion.p
                      key="error"
                      role="alert"
                      className="text-[0.9rem] text-[oklch(0.78_0.14_25)]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {status.message} You can also email me directly at {profile.email}.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  className = "",
  children,
}: {
  label: string;
  name: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[0.8rem] text-[oklch(0.78_0.14_25)]" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
