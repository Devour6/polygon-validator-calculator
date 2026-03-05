'use client';

import { AlertCircle } from 'lucide-react';

export function KeyAssumptions() {
  const assumptions = [
    'Annual emission: 103.5M POL (Year 6 schedule)',
    '~57 checkpoints submitted per day',
    '10% proposer bonus on checkpoint rewards',
    '105 maximum active validator slots',
    'Minimum 10,000 POL self-stake required',
    '~2 day unbonding period for unstaking',
    'No slashing currently active on mainnet',
    'ETH gas required for checkpoint submissions',
  ];

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-4 h-4 text-phase-purple" />
        <h3 className="font-[family-name:var(--font-display)] text-base text-cream">
          Key Assumptions
        </h3>
      </div>
      <ul className="space-y-2">
        {assumptions.map((a) => (
          <li
            key={a}
            className="flex items-start gap-2 text-cream-60 text-sm font-[family-name:var(--font-body)]"
          >
            <span className="text-cream-20 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-cream-20 inline-block" />
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
