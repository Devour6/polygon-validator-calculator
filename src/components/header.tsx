'use client';

import { Shield, Info } from 'lucide-react';

export function Header() {
  return (
    <header className="relative z-10 pt-8 pb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[rgba(130,71,229,0.15)] border border-[rgba(130,71,229,0.3)] flex items-center justify-center">
          <Shield className="w-5 h-5 text-phase-purple" />
        </div>
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-cream tracking-wide">
            Polygon PoS Validator Calculator
          </h1>
          <p className="text-cream-40 text-sm font-[family-name:var(--font-body)]">
            Validator and Delegator Profitability Analysis
          </p>
        </div>
      </div>

      <div className="glass-card p-4 flex items-start gap-3 mt-4">
        <Info className="w-4 h-4 text-phase-purple mt-0.5 shrink-0" />
        <p className="text-cream-60 text-sm leading-relaxed font-[family-name:var(--font-body)]">
          Calculate potential returns for running a Polygon PoS validator or delegating stake.
          Click any validator in the table to load their parameters, or input custom values.
          Toggle between Validator Operator and Delegator modes to analyze different strategies.
        </p>
      </div>
    </header>
  );
}
