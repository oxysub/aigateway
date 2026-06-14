"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

type ContactFormProps = {
  submitLabel?: string;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ submitLabel = "Submit Enquiry" }: ContactFormProps) {
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to send message.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
        <p className="text-lg font-semibold text-foreground">Thank you for reaching out.</p>
        <p className="mt-2 text-sm text-muted">
          Your message has been sent. Our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent transition-colors hover:text-accent-light"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === "submitting"}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "submitting"}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          disabled={status === "submitting"}
          className={inputClass}
          placeholder="Your company (optional)"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          disabled={status === "submitting"}
          className={`${inputClass} resize-none`}
          placeholder="How can we help you?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-accent" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : submitLabel}
      </button>
    </form>
  );
}
