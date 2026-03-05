'use client';

import type { CalculatorInputs, CalculatorResults } from '@/lib/types';
import { fmt, fmtUsd } from '@/lib/formatters';
import { TrendingUp, DollarSign, Coins, Calendar } from 'lucide-react';

interface ResultsPanelProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function ResultsPanel({ inputs, results }: ResultsPanelProps) {
  const isValidator = inputs.mode === 'validator';
  const profitColor =
    results.netProfitUsd > 5000
      ? 'text-phase-green'
      : results.netProfitUsd > 0
        ? 'text-phase-yellow'
        : 'text-phase-red';

  return (
    <div className="glass-card p-6 mb-6">
      <h3 className="font-[family-name:var(--font-display)] text-base text-cream mb-4">
        {isValidator ? 'Validator Returns' : 'Delegation Returns'}
      </h3>

      {/* Primary metric */}
      <div className="text-center py-4 mb-4 border-b border-cream-8">
        <p className="text-cream-40 text-xs uppercase tracking-wider mb-1 font-[family-name:var(--font-body)]">
          {isValidator ? 'Net Annual Profit' : 'Annual Revenue'}
        </p>
        <p className={`font-[family-name:var(--font-display)] text-3xl ${profitColor}`}>
          {fmtUsd(results.netProfitUsd)}
        </p>
        <p className="text-cream-40 text-sm mt-1 font-[family-name:var(--font-body)]">
          {fmt(results.annualRevenuePol, 0)} POL / year
        </p>
      </div>

      {/* Key metrics grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-phase-green mt-0.5 shrink-0" />
          <div>
            <p className="text-cream-40 text-xs font-[family-name:var(--font-body)]">Effective APY</p>
            <p className="text-cream text-lg font-medium font-[family-name:var(--font-body)]">
              {results.effectiveApy.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-phase-blue mt-0.5 shrink-0" />
          <div>
            <p className="text-cream-40 text-xs font-[family-name:var(--font-body)]">Gross APY</p>
            <p className="text-cream text-lg font-medium font-[family-name:var(--font-body)]">
              {results.grossApy.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-phase-purple mt-0.5 shrink-0" />
          <div>
            <p className="text-cream-40 text-xs font-[family-name:var(--font-body)]">Monthly Profit</p>
            <p className="text-cream text-lg font-medium font-[family-name:var(--font-body)]">
              {fmtUsd(results.monthlyProfitUsd)}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Coins className="w-4 h-4 text-phase-yellow mt-0.5 shrink-0" />
          <div>
            <p className="text-cream-40 text-xs font-[family-name:var(--font-body)]">Daily Rewards</p>
            <p className="text-cream text-lg font-medium font-[family-name:var(--font-body)]">
              {fmt(results.dailyTotal, 2)} POL
            </p>
          </div>
        </div>
      </div>

      {/* Revenue / Costs breakdown */}
      <div className="space-y-2 border-t border-cream-8 pt-4">
        <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
          <span className="text-cream-40">Annual Revenue (USD)</span>
          <span className="text-cream">{fmtUsd(results.annualRevenueUsd)}</span>
        </div>
        {isValidator && (
          <div className="flex justify-between text-sm font-[family-name:var(--font-body)]">
            <span className="text-cream-40">Annual Costs (USD)</span>
            <span className="text-phase-red">-{fmtUsd(results.annualCostsUsd)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-medium border-t border-cream-8 pt-2 font-[family-name:var(--font-body)]">
          <span className="text-cream-60">Net Profit (USD)</span>
          <span className={profitColor}>{fmtUsd(results.netProfitUsd)}</span>
        </div>
      </div>
    </div>
  );
}
