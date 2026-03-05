'use client';

import { ShieldAlert } from 'lucide-react';

interface RiskItem {
  risk: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

const risks: RiskItem[] = [
  {
    risk: 'POL Price Volatility',
    impact: 'Direct impact on USD-denominated returns; rewards paid in POL',
    severity: 'high',
  },
  {
    risk: 'ETH Gas Spikes',
    impact: 'Checkpoint submission costs can surge during network congestion',
    severity: 'high',
  },
  {
    risk: 'Potential Slashing (V3.0)',
    impact: 'Future protocol upgrades may introduce slashing for misbehavior',
    severity: 'medium',
  },
  {
    risk: 'PIP-78 Emission Reduction',
    impact: 'Proposed emission reduction would lower validator rewards',
    severity: 'medium',
  },
  {
    risk: 'Validator Set Competition',
    impact: 'Increasing stake concentration among top validators',
    severity: 'medium',
  },
  {
    risk: 'Unbonding Period Risk',
    impact: '~2 day lockup prevents immediate reaction to market moves',
    severity: 'low',
  },
];

export function RiskFactors() {
  const severityColors = {
    high: 'text-phase-red',
    medium: 'text-phase-yellow',
    low: 'text-cream-40',
  };

  const severityBg = {
    high: 'bg-[rgba(248,113,113,0.1)]',
    medium: 'bg-[rgba(250,204,21,0.1)]',
    low: 'bg-[rgba(243,238,217,0.05)]',
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="w-4 h-4 text-phase-red" />
        <h3 className="font-[family-name:var(--font-display)] text-base text-cream">
          Risk Factors
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-body)]">
          <thead>
            <tr className="border-b border-cream-8">
              <th className="px-3 py-2 text-left text-cream-40 font-medium text-xs uppercase tracking-wider">
                Risk
              </th>
              <th className="px-3 py-2 text-left text-cream-40 font-medium text-xs uppercase tracking-wider">
                Impact
              </th>
              <th className="px-3 py-2 text-right text-cream-40 font-medium text-xs uppercase tracking-wider">
                Severity
              </th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r) => (
              <tr key={r.risk} className="border-b border-cream-5">
                <td className="px-3 py-3 text-cream font-medium">{r.risk}</td>
                <td className="px-3 py-3 text-cream-60">{r.impact}</td>
                <td className="px-3 py-3 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${severityColors[r.severity]} ${severityBg[r.severity]}`}
                  >
                    {r.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
