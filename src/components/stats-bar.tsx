'use client';

import { VALIDATORS } from '@/data/validators';
import { fmtCompact } from '@/lib/formatters';
import { DEFAULT_ANNUAL_EMISSION, DEFAULT_NETWORK_STAKED } from '@/lib/constants';

export function StatsBar() {
  const totalValidators = VALIDATORS.length;
  const totalStaked = VALIDATORS.reduce((sum, v) => sum + v.totalStake, 0);
  const avgCommission =
    VALIDATORS.reduce((sum, v) => sum + v.commission, 0) / totalValidators;
  const networkApy = (DEFAULT_ANNUAL_EMISSION / DEFAULT_NETWORK_STAKED) * 100;

  const stats = [
    { label: 'Total Validators', value: totalValidators.toString() },
    { label: 'Total Staked', value: fmtCompact(totalStaked) + ' POL' },
    { label: 'Avg Commission', value: avgCommission.toFixed(1) + '%' },
    { label: 'Network APY', value: networkApy.toFixed(2) + '%' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
      {stats.map((stat) => (
        <div key={stat.label} className="bg-cream-5 border border-cream-8 rounded-xl p-4">
          <span className="font-display text-[10px] font-normal uppercase tracking-[0.1em] text-cream-40">
            {stat.label}
          </span>
          <div className="font-display text-lg text-cream mt-1">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
