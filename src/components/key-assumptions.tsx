'use client';

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
    <div className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.36s' }}>
      <h3 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-4">
        Key Assumptions
      </h3>
      <ul className="space-y-2">
        {assumptions.map((a) => (
          <li key={a} className="flex items-start gap-2 text-cream-60 text-sm font-body">
            <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-cream-20 inline-block" />
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
