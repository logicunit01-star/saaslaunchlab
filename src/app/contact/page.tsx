import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Editorial",
  description: `Contact the editorial desk at ${siteConfig.name} for technical feedback, architecture inquiries, or editorial correspondence.`,
  alternates: {
    canonical: `${siteConfig.url}/contact`
  }
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-700 uppercase tracking-widest bg-sky-50 px-2.5 py-1 rounded-sm mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>EDITORIAL DESK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-950 tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Have a question regarding one of our architectural blueprints, feedback on an MVP breakdown,
            or a suggestion for an engineering deep-dive? Send our editorial team a message below.
          </p>
        </div>

        {/* Form Component */}
        <ContactForm />
      </div>
    </div>
  );
}
