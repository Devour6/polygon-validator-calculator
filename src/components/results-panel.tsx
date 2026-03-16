'use client';

import type { CalculatorInputs, CalculatorResults } from '@/lib/types';
import { fmt, fmtUsd, fmtPercent } from '@/lib/formatters';

interface ResultsPanelProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function ResultsPanel({ inputs, results }: ResultsPanelProps) {
  const isValidator = inputs.mode === 'validator';
  const profitColor =
    results.netProfitUsd > 0
      ? 'text-phase-green'
      : results.netProfitUsd > -1000
        ? 'text-phase-yellow'
        : 'text-phase-red';

  return (
    <div className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.28s' }}>
      <h3 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-4">
        {isValidator ? 'Validator Returns' : 'Delegation Returns'}
      </h3>

      {/* Primary metric */}
      <div className="text-center py-4 mb-4 border-b border-cream-8" aria-live="polite" aria-atomic="true">
        <p className="text-cream-40 text-[11px] uppercase tracking-[0.08em] mb-1 font-body">
          {isValidator ? 'Net Annual Profit' : 'Annual Revenue'}
        </p>
        <p className={`font-display text-3xl ${profitColor}`}>
          {fmtUsd(results.netProfitUsd)}
        </p>
        <p className="text-cream-40 text-sm mt-1 font-body">
          {fmt(results.annualRevenuePol, 0)} POL / year
        </p>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { label: 'Effective APY', value: fmtPercent(results.effectiveApy) },
          { label: 'Gross APY', value: fmtPercent(results.grossApy) },
          { label: 'Monthly Profit', value: fmtUsd(results.monthlyProfitUsd) },
          { label: 'Daily Rewards', value: fmt(results.dailyTotal, 2) + ' POL' },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-cream-40 text-xs font-body">{label}</p>
            <p className="text-cream text-lg font-medium font-body">{value}</p>
          </div>
        ))}
      </div>

      {/* Revenue / Costs breakdown */}
      <div className="space-y-2 border-t border-cream-8 pt-4">
        <div className="flex justify-between text-sm font-body">
          <span className="text-cream-40">Annual Revenue (USD)</span>
          <span className="text-cream">{fmtUsd(results.annualRevenueUsd)}</span>
        </div>
        {isValidator && (
          <div className="flex justify-between text-sm font-body">
            <span className="text-cream-40">Annual Costs (USD)</span>
            <span className="text-phase-red">-{fmtUsd(results.annualCostsUsd)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-medium border-t border-cream-8 pt-2 font-body">
          <span className="text-cream-60">Net Profit (USD)</span>
          <span className={profitColor}>{fmtUsd(results.netProfitUsd)}</span>
        </div>
      </div>
    </div>
  );
}
