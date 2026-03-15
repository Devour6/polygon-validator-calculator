'use client';

import type { CalculatorInputs, CalculatorResults } from '@/lib/types';
import { fmt, fmtPercent } from '@/lib/formatters';

interface RevenueBreakdownProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function RevenueBreakdown({ inputs, results }: RevenueBreakdownProps) {
  const isValidator = inputs.mode === 'validator';

  const rows = [
    { label: 'Stake Share', value: fmtPercent(results.stakeShare * 100, 4), show: true },
    { label: 'Checkpoint Rewards / Day', value: fmt(results.dailyCheckpointRewards, 2) + ' POL', show: true },
    { label: 'Proposer Bonus / Day', value: fmt(results.dailyProposerBonus, 2) + ' POL', show: isValidator },
    { label: 'Commission / Day', value: fmt(results.dailyCommission, 2) + ' POL', show: isValidator },
    { label: 'Self-Stake Rewards / Day', value: fmt(results.dailySelfRewards, 2) + ' POL', show: isValidator },
    { label: 'Daily Total', value: fmt(results.dailyTotal, 2) + ' POL', show: true, highlight: true },
    { label: 'Reward per Checkpoint', value: fmt(results.rewardPerCheckpoint, 2) + ' POL', show: true },
    { label: 'Gross APY', value: fmtPercent(results.grossApy), show: true },
  ];

  return (
    <div className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.30s' }}>
      <h3 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-4">
        Revenue Breakdown
      </h3>
      <div className="space-y-2">
        {rows
          .filter((r) => r.show)
          .map((row) => (
            <div
              key={row.label}
              className={`flex justify-between text-sm font-body ${
                row.highlight ? 'border-t border-cream-8 pt-2 mt-2 font-medium' : ''
              }`}
            >
              <span className={row.highlight ? 'text-cream-60' : 'text-cream-40'}>
                {row.label}
              </span>
              <span className={row.highlight ? 'text-cream' : 'text-cream-60'}>
                {row.value}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
