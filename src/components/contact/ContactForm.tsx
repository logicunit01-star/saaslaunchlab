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

    // Prepare HubSpot payload mapping strictly to form fields
    // Notice: Do NOT pass 'name' as a property because HubSpot only has 'firstname' and 'lastname'.
    // The "Full Name" field on this form maps to 'firstname'.
    const hubspotPayload = {
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
      }
    };

    try {
      // 1. Direct browser submission to HubSpot Forms Submission API v3 (handles real IP, cookies, and CORS)
      const hsPromise = fetch(
        "https://api-na2.hsforms.com/submissions/v3/integration/submit/246175508/115db458-7775-41e5-9827-269d275ebf11",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hubspotPayload)
        }
      ).catch((err) => {
        console.warn("HubSpot client submission warning:", err);
      });

      // 2. Also send to internal server API route (for server-side logging and Resend notifications)
      const internalPromise = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          hutk
        })
      });

      // Await both dispatches
      await Promise.allSettled([hsPromise, internalPromise]);

      setStatus("success");
      setFeedbackMessage("Thank you for reaching out! Your inquiry has been received and logged in our system.");
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

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Vance"
              disabled={status === "submitting"}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                errors.name
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-200 bg-white"
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-1.5">
              Work Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@company.com"
              disabled={status === "submitting"}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-hidden focus:ring-2 ${
                errors.email
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30"
                  : "border-slate-300 focus:border-sky-500 focus:ring-sky-200 bg-white"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>}
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-1.5">
            Subject <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Database Architecture Scoping or MVP Review"
            disabled={status === "submitting"}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-hidden focus:ring-2 ${
              errors.subject
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30"
                : "border-slate-300 focus:border-sky-500 focus:ring-sky-200 bg-white"
            }`}
          />
          {errors.subject && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-1.5">
            Message <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please detail your architecture questions, technical stack, or project requirements..."
            disabled={status === "submitting"}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all focus:outline-hidden focus:ring-2 resize-y ${
              errors.message
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30"
                : "border-slate-300 focus:border-sky-500 focus:ring-sky-200 bg-white"
            }`}
          />
          {errors.message && <p className="mt-1 text-xs text-rose-600 font-medium">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
