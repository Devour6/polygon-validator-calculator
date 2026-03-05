'use client';

import type { VerdictInfo } from '@/lib/types';

interface VerdictCardProps {
  verdict: VerdictInfo;
}

export function VerdictCard({ verdict }: VerdictCardProps) {
  const config = {
    profitable: {
      borderColor: 'border-phase-green',
      bgColor: 'bg-green-dim',
      titleColor: 'text-phase-green',
    },
    marginal: {
      borderColor: 'border-phase-yellow',
      bgColor: 'bg-yellow-dim',
      titleColor: 'text-phase-yellow',
    },
    unprofitable: {
      borderColor: 'border-phase-red',
      bgColor: 'bg-red-dim',
      titleColor: 'text-phase-red',
    },
  };

  const c = config[verdict.type];

  return (
    <div className={`border border-cream-8 rounded-2xl p-6 border-l-4 ${c.borderColor} ${c.bgColor} opacity-0 animate-fade-in-up`} style={{ animationDelay: '0.26s' }}>
      <h3 className={`font-display text-lg mb-2 ${c.titleColor}`}>
        {verdict.title}
      </h3>
      <p className="text-cream-60 text-sm leading-relaxed font-body">
        {verdict.detail}
      </p>
    </div>
  );
}
