import { siteConfig } from "@/lib/config";

export function EditorialMasthead() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <section className="border-b border-slate-200 py-10 sm:py-14 bg-gradient-to-b from-sky-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-sm mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Engineering & Product Journal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 font-serif tracking-tight">
              {siteConfig.name}
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-slate-500 font-medium md:text-right">
            <span>{today}</span>
            <div className="text-xs text-slate-400 mt-0.5">Vol. 2026 &bull; Architecture & Code</div>
          </div>
        </div>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {siteConfig.tagline}. In-depth blueprints on system design, database schemas, MVP velocity,
          and artificial intelligence integration.
        </p>
      </div>
    </section>
  );
}
