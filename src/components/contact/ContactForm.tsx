"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your full name.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) {
      errs.subject = "Please enter an inquiry subject.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMessage(data.message || "Thank you. Your message has been received.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
        setFeedbackMessage(
          data.message || "There was a problem submitting your inquiry. Please check your fields."
        );
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("Network error: Unable to reach the server. Please check your connection.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
      {status === "success" && (
        <div
          role="alert"
          className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start space-x-3"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Message Received</p>
            <p className="mt-0.5 text-emerald-700">{feedbackMessage}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Submission Notice</p>
            <p className="mt-0.5 text-rose-700">{feedbackMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Elena Rostova"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                errors.name ? "border-rose-300 bg-rose-50/20" : "border-slate-300"
              }`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-rose-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Work Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="elena@company.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
                errors.email ? "border-rose-300 bg-rose-50/20" : "border-slate-300"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-rose-600">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Editorial inquiry, technical feedback, or partnership"
            className={`w-full px-4 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 ${
              errors.subject ? "border-rose-300 bg-rose-50/20" : "border-slate-300"
            }`}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-xs text-rose-600">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Share your thoughts, suggestions, or technical questions..."
            className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500 resize-y ${
              errors.message ? "border-rose-300 bg-rose-50/20" : "border-slate-300"
            }`}
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-rose-600">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-lg bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-300" />
                <span>Validating & Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
