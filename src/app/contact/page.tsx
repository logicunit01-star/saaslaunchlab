import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ContactForm } from "@/components/contact/ContactForm";
import { ChevronRight, Mail, Clock, MessageSquare } from "lucide-react";

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
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-700 font-medium">Contact</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-700 uppercase tracking-widest bg-sky-50 px-2.5 py-1 rounded-sm mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Editorial Desk</span>
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

        {/* Editorial Desk Information */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200">
          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              <Mail className="w-4 h-4 text-sky-500" />
              <span>Direct Desk</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              {siteConfig.contactEmail}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              For direct editorial queries, corrections, and press inquiries.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>Turnaround</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              24–48 Business Hours
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Every submission is evaluated by our core technical editing team.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              <MessageSquare className="w-4 h-4 text-sky-500" />
              <span>Guidelines</span>
            </div>
            <p className="text-sm font-semibold text-slate-900">
              Engineering Blueprints
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Technical feedback and system architecture questions are prioritized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
