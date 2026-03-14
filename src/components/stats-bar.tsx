'use client';

import { VALIDATORS } from '@/data/validators';
import { fmtCompact } from '@/lib/formatters';
import { DEFAULT_ANNUAL_EMISSION, DEFAULT_NETWORK_STAKED } from '@/lib/constants';
import type { LiveData } from '@/hooks/use-live-data';

interface StatsBarProps {
  liveData?: LiveData | null;
  loading?: boolean;
}

export function StatsBar({ liveData, loading }: StatsBarProps) {
  const validators = liveData?.validators && liveData.validators.length > 0
    ? liveData.validators
    : VALIDATORS;
  const networkStake = liveData?.networkStake ?? DEFAULT_NETWORK_STAKED;
  const annualEmission = liveData?.annualEmission ?? DEFAULT_ANNUAL_EMISSION;

  const totalValidators = validators.length;
  const totalStaked = validators.reduce((sum, v) => sum + v.totalStake, 0);
  const avgCommission =
    validators.reduce((sum, v) => sum + v.commission, 0) / totalValidators;
  const networkApy = (annualEmission / networkStake) * 100;

  const isLive = !!liveData?.updatedAt;

  const stats = [
    { label: 'Total Validators', value: totalValidators.toString() },
    { label: 'Total Staked', value: fmtCompact(totalStaked) + ' POL' },
    { label: 'Avg Commission', value: avgCommission.toFixed(1) + '%' },
    { label: 'Network APY', value: networkApy.toFixed(2) + '%' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        {loading ? (
          <span className="text-[11px] text-cream-20 font-body">Loading live data...</span>
        ) : isLive ? (
          <span className="flex items-center gap-1.5 text-[11px] text-phase-green font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-phase-green animate-pulse" />
            Live
          </span>
        ) : (
          <span className="text-[11px] text-cream-20 font-body">Static defaults</span>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.16s' }}>
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
    </div>
  );
}
