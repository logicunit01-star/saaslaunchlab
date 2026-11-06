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

    // Extract HubSpot tracking cookie if present on the browser
    const getHubspotUtk = () => {
      if (typeof document === "undefined") return undefined;
      const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]*)/);
      return match ? decodeURIComponent(match[1]) : undefined;
    };

    const trimmedName = formData.name.trim();
    const nameParts = trimmedName.split(/\s+/);
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
    const hutk = getHubspotUtk();

    // Identify user in HubSpot tracking script if active
    if (typeof window !== "undefined" && (window as unknown as { _hsq?: unknown[] })._hsq) {
      try {
        (window as unknown as { _hsq: unknown[] })._hsq.push([
          "identify",
          {
            email: formData.email.trim(),
            firstname: trimmedName
          }
        ]);
      } catch {
        // non-blocking
      }
    }

    // Prepare HubSpot payload mapping strictly to form fields
    // Notice: Do NOT pass 'name' as a property because HubSpot only has 'firstname' and 'lastname'.
    // The "Full Name" field on this form maps to 'firstname'.
    const hubspotPayload = {
      submittedAt: Date.now(),
      fields: [
        { name: "email", value: formData.email.trim() },
        { name: "firstname", value: trimmedName },
        ...(lastName ? [{ name: "lastname", value: lastName }] : []),
        { name: "subject", value: formData.subject.trim() },
        { name: "message", value: formData.message.trim() },
        { name: "content", value: formData.message.trim() },
        { name: "hs_ticket_subject", value: formData.subject.trim() },
        { name: "hs_ticket_content", value: formData.message.trim() }
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "https://saaslaunchlab.com/contact",
        pageName: typeof document !== "undefined" ? document.title : "Contact Us - SaaS Launch Lab",
        hutk: hutk || undefined
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow SaaS Launch Lab to store and process my personal data."
        }
      }
    };

    let clientHubspotSuccess = false;
    try {
      // 1. Direct browser submission to HubSpot Forms Submission API v3 (handles real IP, cookies, and CORS)
      const hsRes = await fetch(
        "https://api-na2.hsforms.com/submissions/v3/integration/submit/246175508/115db458-7775-41e5-9827-269d275ebf11",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotPayload)
        }
      );
      if (hsRes.ok) {
        clientHubspotSuccess = true;
      }
    } catch (err) {
      console.warn("HubSpot client submission warning:", err);
    }

    try {
      // 2. Also send to internal server API route (for email notifications and server-side fallback if client was blocked)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          hutk,
          skipHubspot: clientHubspotSuccess
        })
      });

      setStatus("success");
      setFeedbackMessage("Thank you for reaching out! Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
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

      <form
        id="saaslaunchlab-contact-form"
        action="/api/contact"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              FULL NAME <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Elena Rostova"
              disabled={status === "submitting"}
              className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-hidden ${
                errors.name
                  ? "border-rose-300 focus:border-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:border-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              WORK EMAIL <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="elena@company.com"
              disabled={status === "submitting"}
              className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-hidden ${
                errors.email
                  ? "border-rose-300 focus:border-rose-500 bg-rose-50/30"
                  : "border-slate-200 focus:border-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.email}</p>}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            SUBJECT <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Editorial inquiry, technical feedback, or partnership"
            disabled={status === "submitting"}
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-hidden ${
              errors.subject
                ? "border-rose-300 focus:border-rose-500 bg-rose-50/30"
                : "border-slate-200 focus:border-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />
          {errors.subject && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            MESSAGE <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Share your thoughts, suggestions, or technical questions..."
            disabled={status === "submitting"}
            className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-hidden resize-y ${
              errors.message
                ? "border-rose-300 focus:border-rose-500 bg-rose-50/30"
                : "border-slate-200 focus:border-slate-400 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />
          {errors.message && <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-950 hover:bg-slate-900 text-white font-medium text-sm transition-colors shadow-xs cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
