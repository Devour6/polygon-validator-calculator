'use client';

import { Users, Coins, Percent, TrendingUp } from 'lucide-react';
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
    {
      label: 'Total Validators',
      value: totalValidators.toString(),
      icon: Users,
      color: 'text-phase-purple',
    },
    {
      label: 'Total Staked',
      value: fmtCompact(totalStaked) + ' POL',
      icon: Coins,
      color: 'text-phase-blue',
    },
    {
      label: 'Avg Commission',
      value: avgCommission.toFixed(1) + '%',
      icon: Percent,
      color: 'text-phase-yellow',
    },
    {
      label: 'Network APY',
      value: networkApy.toFixed(2) + '%',
      icon: TrendingUp,
      color: 'text-phase-green',
    },
  ];

  return (
    <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
            <span className="text-cream-40 text-xs font-[family-name:var(--font-body)] uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
          <div className="font-[family-name:var(--font-display)] text-lg text-cream">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
