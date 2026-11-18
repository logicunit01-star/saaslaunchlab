"use client";

import React, { useState, useMemo } from "react";

// Self-contained SVG Icon Components (zero external bundle dependencies)
const IconServer = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
    <line x1="6" x2="6.01" y1="6" y2="6"/>
    <line x1="6" x2="6.01" y1="18" y2="18"/>
  </svg>
);

const IconDatabase = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5V19A9 3 0 0 0 21 19V5"/>
    <path d="M3 12A9 3 0 0 0 21 12"/>
  </svg>
);

const IconHardDrive = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" x2="2" y1="12" y2="12"/>
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    <line x1="6" x2="6.01" y1="16" y2="16"/>
    <line x1="10" x2="10.01" y1="16" y2="16"/>
  </svg>
);

const IconGlobe = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" x2="22" y1="12" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconShieldCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconCopy = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const IconTrendingDown = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
    <polyline points="16 17 22 17 22 11"/>
  </svg>
);

const IconSparkles = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const IconInfo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

interface Preset {
  id: string;
  label: string;
  badge: string;
  users: number;
  arpu: number;
  workload: "low" | "medium" | "high";
  model: "vm" | "paas" | "serverless";
}

const PRESETS: Preset[] = [
  {
    id: "mvp",
    label: "Early-Stage MVP",
    badge: "100 Users",
    users: 100,
    arpu: 15,
    workload: "low",
    model: "vm"
  },
  {
    id: "growth",
    label: "Growing SaaS",
    badge: "1,000 Users",
    users: 1000,
    arpu: 15,
    workload: "medium",
    model: "vm"
  },
  {
    id: "scale",
    label: "Established Scale",
    badge: "10,000 Users",
    users: 10000,
    arpu: 29,
    workload: "medium",
    model: "vm"
  },
  {
    id: "ai-heavy",
    label: "High-Data / AI SaaS",
    badge: "2,500 Users",
    users: 2500,
    arpu: 49,
    workload: "high",
    model: "serverless"
  }
];

export function HostingCostCalculator() {
  const [users, setUsers] = useState<number>(1000);
  const [arpu, setArpu] = useState<number>(15);
  const [workload, setWorkload] = useState<"low" | "medium" | "high">("medium");
  const [model, setModel] = useState<"vm" | "paas" | "serverless">("vm");
  const [copied, setCopied] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>("growth");

  const applyPreset = (preset: Preset) => {
    setActivePreset(preset.id);
    setUsers(preset.users);
    setArpu(preset.arpu);
    setWorkload(preset.workload);
    setModel(preset.model);
  };

  const calculations = useMemo(() => {
    const workloadMult = workload === "low" ? 0.75 : workload === "medium" ? 1.0 : 1.65;

    // Scale calculation modeling calibrated to the guide's verified benchmarks
    const scaleFactor = Math.pow(Math.max(users, 50) / 1000, 0.65);

    const compute = Math.round(100 * scaleFactor * workloadMult * (model === "serverless" ? 0.75 : model === "paas" ? 1.3 : 1.0));
    const database = Math.round(120 * scaleFactor * workloadMult * (model === "paas" ? 1.2 : 1.0));
    const storage = Math.round(25 * Math.pow(Math.max(users, 50) / 1000, 0.78) * workloadMult);
    const bandwidth = Math.round(40 * Math.pow(Math.max(users, 50) / 1000, 0.7) * (workload === "high" ? 2.0 : 1.0));
    const ops = Math.round(45 * Math.pow(Math.max(users, 50) / 1000, 0.6) * (model === "paas" ? 0.8 : 1.0));

    const totalHosting = Math.max(35, compute + database + storage + bandwidth + ops);
    const costPerUser = Number((totalHosting / Math.max(users, 1)).toFixed(2));
    const mrr = users * arpu;
    const hostingPctOfRevenue = mrr > 0 ? Number(((totalHosting / mrr) * 100).toFixed(1)) : 0;
    const hostingGrossMargin = Math.max(0, Number((100 - hostingPctOfRevenue).toFixed(1)));

    return {
      compute,
      database,
      storage,
      bandwidth,
      ops,
      totalHosting,
      costPerUser,
      mrr,
      hostingPctOfRevenue,
      hostingGrossMargin
    };
  }, [users, arpu, workload, model]);

  const handleCopySummary = () => {
    const text = `SaaS Infrastructure Cost Estimate (SaaS Launch Lab)
-----------------------------------------------
Active Customers: ${users.toLocaleString()}
Subscription ARPU: $${arpu}/mo
Projected Monthly MRR: $${calculations.mrr.toLocaleString()}
Architecture: ${model.toUpperCase()} (${workload.toUpperCase()} workload)

Itemized Monthly Cloud Hosting:
- Compute & Application Servers: $${calculations.compute} (${Math.round((calculations.compute / calculations.totalHosting) * 100)}%)
- Database & In-Memory Caching: $${calculations.database} (${Math.round((calculations.database / calculations.totalHosting) * 100)}%)
- Object Storage (S3/GCS): $${calculations.storage} (${Math.round((calculations.storage / calculations.totalHosting) * 100)}%)
- Bandwidth & Global CDN: $${calculations.bandwidth} (${Math.round((calculations.bandwidth / calculations.totalHosting) * 100)}%)
- Backups, APM & Monitoring: $${calculations.ops} (${Math.round((calculations.ops / calculations.totalHosting) * 100)}%)
-----------------------------------------------
Total Monthly Hosting Bill: $${calculations.totalHosting.toLocaleString()}/mo
Hosting Cost Per Active Customer: $${calculations.costPerUser}/customer/mo
Hosting as % of MRR: ${calculations.hostingPctOfRevenue}%
Hosting Gross Margin: ${calculations.hostingGrossMargin}%
Source: https://saaslaunchlab.com/blog/saas-hosting-costs`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="my-10 rounded-2xl border-2 border-sky-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-8 text-slate-100 shadow-xl shadow-sky-950/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
            <IconSparkles className="w-3.5 h-3.5" />
            Interactive Planning Tool
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SaaS Hosting &amp; Cloud Infrastructure Cost Calculator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Simulate monthly infrastructure expenses, compute cost per customer, and evaluate hosting gross margins.
          </p>
        </div>

        <button
          onClick={handleCopySummary}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all self-start sm:self-center shrink-0 cursor-pointer"
          title="Copy cost estimate summary to clipboard"
        >
          {copied ? (
            <>
              <IconCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300">Summary Copied!</span>
            </>
          ) : (
            <>
              <IconCopy className="w-4 h-4 text-sky-400" />
              <span>Copy Breakdown</span>
            </>
          )}
        </button>
      </div>

      {/* Preset Quick-Buttons */}
      <div className="pt-6 pb-2">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          1. Select a Planning Scenario Preset
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESETS.map((p) => {
            const isSelected = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => applyPreset(p)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sky-500/20 border-sky-400 text-white shadow-sm shadow-sky-500/20"
                    : "bg-slate-800/60 border-slate-750 text-slate-300 hover:bg-slate-800 hover:border-slate-600"
                }`}
              >
                <span className="text-xs font-bold">{p.label}</span>
                <span className="text-[11px] text-sky-400 font-mono mt-0.5">{p.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6 pt-4 border-t border-slate-800/80">
        {/* Left Column: Sliders & Controls */}
        <div className="space-y-6">
          {/* Slider 1: Active Users */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="input-active-customers" className="text-sm font-semibold text-slate-200">
                Monthly Active Customers (Users or Orgs)
              </label>
              <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                <input
                  id="input-active-customers"
                  type="number"
                  min="10"
                  max="50000"
                  step="50"
                  value={users}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setUsers(Math.max(10, Number(e.target.value) || 0));
                  }}
                  className="w-20 bg-transparent text-right font-mono font-bold text-sky-400 focus:outline-hidden"
                />
                <span className="text-xs text-slate-400">users</span>
              </div>
            </div>
            <input
              type="range"
              min="50"
              max="20000"
              step="50"
              value={users}
              onChange={(e) => {
                setActivePreset("custom");
                setUsers(Number(e.target.value));
              }}
              aria-label="Monthly Active Customers slider"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>50 MVP</span>
              <span>1,000 Growth</span>
              <span>10,000 Scale</span>
              <span>20,000+</span>
            </div>
          </div>

          {/* Slider 2: Subscription Price (ARPU) */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="input-monthly-arpu" className="text-sm font-semibold text-slate-200">
                Average Revenue Per User (Monthly ARPU)
              </label>
              <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                <span className="text-xs text-emerald-400 font-bold">$</span>
                <input
                  id="input-monthly-arpu"
                  type="number"
                  min="5"
                  max="500"
                  step="5"
                  value={arpu}
                  onChange={(e) => {
                    setActivePreset("custom");
                    setArpu(Math.max(1, Number(e.target.value) || 0));
                  }}
                  className="w-16 bg-transparent text-right font-mono font-bold text-emerald-400 focus:outline-hidden"
                />
                <span className="text-xs text-slate-400">/mo</span>
              </div>
            </div>
            <input
              type="range"
              min="5"
              max="250"
              step="5"
              value={arpu}
              onChange={(e) => {
                setActivePreset("custom");
                setArpu(Number(e.target.value));
              }}
              aria-label="Average Revenue Per User slider"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>$5 Micro</span>
              <span>$15 Standard B2B</span>
              <span>$49 Pro</span>
              <span>$250 Enterprise</span>
            </div>
          </div>

          {/* Selector 3: Workload Intensity */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Application Workload &amp; Data Intensity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "low", label: "Lightweight CRUD", sub: "Text & admin tools" },
                { id: "medium", label: "Balanced SaaS", sub: "Files & reporting" },
                { id: "high", label: "Heavy Data / AI", sub: "Embeddings & media" }
              ].map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    setActivePreset("custom");
                    setWorkload(w.id as "low" | "medium" | "high");
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    workload === w.id
                      ? "bg-sky-500/20 border-sky-500 text-white"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{w.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{w.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selector 4: Architecture Model */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Cloud Infrastructure Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "vm", label: "Cloud VMs", sub: "AWS EC2 / Droplets" },
                { id: "paas", label: "Managed PaaS", sub: "Render / Railway" },
                { id: "serverless", label: "Serverless", sub: "Lambda / Workers" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActivePreset("custom");
                    setModel(m.id as "vm" | "paas" | "serverless");
                  }}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    model === m.id
                      ? "bg-sky-500/20 border-sky-500 text-white"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{m.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{m.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Outputs & KPIs */}
        <div className="flex flex-col justify-between rounded-xl bg-slate-950/80 p-5 sm:p-6 border border-slate-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Estimated Monthly Infrastructure Economics
            </div>

            {/* Top 2 KPI Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Total Monthly Spend */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                  Total Monthly Hosting
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                  ${calculations.totalHosting.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> /mo</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  MRR: ${calculations.mrr.toLocaleString()}/mo
                </span>
              </div>

              {/* Cost Per Active Customer */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Cost Per Customer
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                  ${calculations.costPerUser}
                  <span className="text-xs text-slate-400 font-normal"> /user</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {calculations.hostingPctOfRevenue}% of subscription price
                </span>
              </div>
            </div>

            {/* Margin Health Status Badge */}
            <div
              className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs mb-5 ${
                calculations.hostingPctOfRevenue <= 3.5
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : calculations.hostingPctOfRevenue <= 6.5
                  ? "bg-sky-950/40 border-sky-500/40 text-sky-300"
                  : "bg-amber-950/40 border-amber-500/40 text-amber-300"
              }`}
            >
              <IconTrendingDown className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">
                  {calculations.hostingPctOfRevenue <= 3.5
                    ? "Excellent Efficiency (< 3.5% of MRR)"
                    : calculations.hostingPctOfRevenue <= 6.5
                    ? "Healthy Standard SaaS Benchmark (3.5% – 6.5%)"
                    : "Elevated Spend (> 6.5% of MRR)"}
                </strong>
                <p className="mt-0.5 text-[11px] opacity-90">
                  {calculations.hostingPctOfRevenue <= 3.5
                    ? `Your projected hosting leaves a high ${calculations.hostingGrossMargin}% infrastructure gross profit margin.`
                    : calculations.hostingPctOfRevenue <= 6.5
                    ? `Within target SaaS margins. As customer base expands, economies of scale will drive cost per customer lower.`
                    : `Consider indexing database queries, enabling CDN caching, and right-sizing idle compute instances.`}
                </p>
              </div>
            </div>

            {/* Itemized Cost Breakdown Bar */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Infrastructure Component Breakdown</span>
                <span>Est. Amount</span>
              </div>

              {[
                { label: "Application Compute", amount: calculations.compute, icon: IconServer, color: "bg-sky-500" },
                { label: "Database Hosting & Cache", amount: calculations.database, icon: IconDatabase, color: "bg-emerald-500" },
                { label: "File & Object Storage", amount: calculations.storage, icon: IconHardDrive, color: "bg-pink-500" },
                { label: "Bandwidth & CDN Egress", amount: calculations.bandwidth, icon: IconGlobe, color: "bg-amber-500" },
                { label: "Backups, APM & Ops", amount: calculations.ops, icon: IconShieldCheck, color: "bg-purple-500" }
              ].map((item, idx) => {
                const pct = Math.round((item.amount / calculations.totalHosting) * 100);
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-center text-slate-300 mb-1">
                      <span className="inline-flex items-center gap-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-slate-400" />
                        {item.label}
                      </span>
                      <span className="font-mono text-slate-200">
                        ${item.amount} <span className="text-slate-500 text-[10px]">({pct}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400">
            <IconInfo className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>
              Illustrative planning model based on AWS/GCP blended regional rates. Add 15–25% contingency before final launch.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
