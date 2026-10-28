import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ArrowLeft, BookOpen, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-8 h-8 text-sky-500" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Error 404
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-slate-950">
            Article Not Found
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The publication or resource you requested does not exist or may have been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/#articles"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Browse All Blueprints</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
