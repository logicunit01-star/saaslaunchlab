"use client";

import React, { useState, useMemo } from "react";

// Self-contained SVG Icons (zero external bundle dependencies)
const IconSparkles = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const IconRotateCcw = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const IconCopy = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export function DevCostCalculator() {
  const [hours, setHours] = useState<number>(1200);
  const [rate, setRate] = useState<number>(35);
  const [contingency, setContingency] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const validHours = Math.max(0, Number(hours) || 0);
    const validRate = Math.max(0, Number(rate) || 0);
    const validContingency = Math.max(0, Math.min(100, Number(contingency) || 0));

    const baseCost = Math.round(validHours * validRate);
    const contingencyAmount = Math.round(baseCost * (validContingency / 100));
    const totalBudget = baseCost + contingencyAmount;

    return {
      validHours,
      validRate,
      validContingency,
      baseCost,
      contingencyAmount,
      totalBudget
    };
  }, [hours, rate, contingency]);

  const handleReset = () => {
    setHours(1200);
    setRate(35);
    setContingency(10);
  };

  const handleCopy = () => {
    const summary = `SaaS Development Cost Estimate (SaaS Launch Lab)
------------------------------------------------
Estimated Development Effort: ${calculations.validHours.toLocaleString()} hours
Blended Hourly Rate: $${calculations.validRate}/hour
Contingency Allowance: ${calculations.validContingency}%

Financial Breakdown:
- Base Development Cost: $${calculations.baseCost.toLocaleString()}
- Contingency Reserve: $${calculations.contingencyAmount.toLocaleString()}
------------------------------------------------
Estimated Total Project Budget: $${calculations.totalBudget.toLocaleString()}

Source: https://saaslaunchlab.com/blog/saas-development-cost-calculator/`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-slate-800 transition-all">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
            SaaS Development Cost Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Illustrative USD estimate. Change the inputs to explore your project budget.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live estimate
        </span>
      </div>

      {/* Main Inputs Form */}
      <div className="space-y-6 pt-6">
        {/* Input 1: Estimated Development Hours */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="input-hours" className="text-sm font-semibold text-slate-800">
              Estimated development hours
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {calculations.validHours > 0 ? `${calculations.validHours.toLocaleString()} hrs` : "Enter hours"}
            </span>
          </div>
          <input
            id="input-hours"
            type="number"
            min="10"
            max="10000"
            step="10"
            value={hours || ""}
            onChange={(e) => setHours(Math.max(0, parseInt(e.target.value, 10) || 0))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-xs"
            placeholder="e.g. 1200"
          />
          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-400">Presets:</span>
            {[
              { label: "MVP (400h)", value: 400 },
              { label: "Growing (800h)", value: 800 },
              { label: "Standard (1,200h)", value: 1200 },
              { label: "Complex (2,000h)", value: 2000 }
            ].map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setHours(preset.value)}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                  hours === preset.value
                    ? "bg-sky-50 border-sky-400 text-sky-700 font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input 2: Blended Hourly Development Rate */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="input-rate" className="text-sm font-semibold text-slate-800">
              Blended hourly development rate (USD)
            </label>
            <span className="text-xs text-slate-400 font-mono">
              ${calculations.validRate}/hr
            </span>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-mono text-sm pointer-events-none">
              $
            </span>
            <input
              id="input-rate"
              type="number"
              min="5"
              max="500"
              step="5"
              value={rate || ""}
              onChange={(e) => setRate(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-xs"
              placeholder="e.g. 35"
            />
          </div>
          {/* Quick rate preset chips */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[11px] text-slate-400">Benchmarks:</span>
            {[
              { label: "$25/h (Offshore)", value: 25 },
              { label: "$35/h (Blended)", value: 35 },
              { label: "$50/h (Nearshore)", value: 50 },
              { label: "$75/h (Senior / Agency)", value: 75 }
            ].map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setRate(preset.value)}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                  rate === preset.value
                    ? "bg-sky-50 border-sky-400 text-sky-700 font-semibold"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input 3: Contingency Allowance Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="input-contingency" className="text-sm font-semibold text-slate-800">
              Contingency allowance
            </label>
            <span className="text-sm font-bold font-mono text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
              {calculations.validContingency}%
            </span>
          </div>
          <input
            id="input-contingency"
            type="range"
            min="0"
            max="40"
            step="1"
            value={contingency}
            onChange={(e) => setContingency(parseInt(e.target.value, 10) || 0)}
            aria-label="Contingency allowance percentage slider"
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
            <span>0% (No buffer)</span>
            <span className="text-sky-600 font-semibold">15–20% Recommended</span>
            <span>40% (Max buffer)</span>
          </div>
        </div>
      </div>

      {/* Output / Results Box */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
          Estimated total project budget
        </span>
        <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 font-mono tracking-tight my-2">
          ${calculations.totalBudget.toLocaleString()}
        </div>

        {/* Breakdown Line Items */}
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm">
          <div className="flex justify-between items-center text-slate-600">
            <span>Base development cost</span>
            <span className="font-mono font-bold text-slate-900">
              ${calculations.baseCost.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Contingency allowance ({calculations.validContingency}%)</span>
            <span className="font-mono font-bold text-slate-900">
              ${calculations.contingencyAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600">
            <span>Estimated hours</span>
            <span className="font-mono font-bold text-slate-900">
              {calculations.validHours.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons: Reset & Copy */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <IconRotateCcw className="w-4 h-4 text-slate-500" />
            Reset calculator
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <IconCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Summary Copied!</span>
              </>
            ) : (
              <>
                <IconCopy className="w-4 h-4 text-slate-300" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
        This is a preliminary estimate, not a vendor quotation. It excludes any costs not included in the estimated hours and rate, such as hosting, third-party services, taxes, and ongoing maintenance.
      </p>
    </div>
  );
}
