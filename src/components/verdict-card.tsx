'use client';

import type { VerdictInfo } from '@/lib/types';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface VerdictCardProps {
  verdict: VerdictInfo;
}

export function VerdictCard({ verdict }: VerdictCardProps) {
  const config = {
    profitable: {
      icon: CheckCircle,
      borderColor: 'border-phase-green',
      bgColor: 'bg-[rgba(74,222,128,0.08)]',
      iconColor: 'text-phase-green',
      titleColor: 'text-phase-green',
    },
    marginal: {
      icon: AlertTriangle,
      borderColor: 'border-phase-yellow',
      bgColor: 'bg-[rgba(250,204,21,0.08)]',
      iconColor: 'text-phase-yellow',
      titleColor: 'text-phase-yellow',
    },
    unprofitable: {
      icon: XCircle,
      borderColor: 'border-phase-red',
      bgColor: 'bg-[rgba(248,113,113,0.08)]',
      iconColor: 'text-phase-red',
      titleColor: 'text-phase-red',
    },
  };

  const c = config[verdict.type];
  const Icon = c.icon;

  return (
    <div className={`glass-card p-6 mb-6 border-l-4 ${c.borderColor} ${c.bgColor}`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-6 h-6 ${c.iconColor}`} />
        <h3 className={`font-[family-name:var(--font-display)] text-lg ${c.titleColor}`}>
          {verdict.title}
        </h3>
      </div>
      <p className="text-cream-60 text-sm leading-relaxed font-[family-name:var(--font-body)]">
        {verdict.detail}
      </p>
    </div>
  );
}
