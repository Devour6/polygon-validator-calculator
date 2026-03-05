'use client';

interface RiskItem {
  risk: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

const risks: RiskItem[] = [
  { risk: 'POL Price Volatility', impact: 'Direct impact on USD-denominated returns; rewards paid in POL', severity: 'high' },
  { risk: 'ETH Gas Spikes', impact: 'Checkpoint submission costs can surge during network congestion', severity: 'high' },
  { risk: 'Potential Slashing (V3.0)', impact: 'Future protocol upgrades may introduce slashing for misbehavior', severity: 'medium' },
  { risk: 'PIP-78 Emission Reduction', impact: 'Proposed emission reduction would lower validator rewards', severity: 'medium' },
  { risk: 'Validator Set Competition', impact: 'Increasing stake concentration among top validators', severity: 'medium' },
  { risk: 'Unbonding Period Risk', impact: '~2 day lockup prevents immediate reaction to market moves', severity: 'low' },
];

export function RiskFactors() {
  const severityColors = {
    high: 'text-phase-red',
    medium: 'text-phase-yellow',
    low: 'text-cream-40',
  };

  const severityBg = {
    high: 'bg-red-dim',
    medium: 'bg-yellow-dim',
    low: 'bg-cream-5',
  };

  return (
    <div className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.38s' }}>
      <h3 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-4">
        Risk Factors
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-cream-8">
              <th className="px-3 py-2 text-left text-cream-40 font-medium text-[10px] uppercase tracking-[0.08em]">Risk</th>
              <th className="px-3 py-2 text-left text-cream-40 font-medium text-[10px] uppercase tracking-[0.08em]">Impact</th>
              <th className="px-3 py-2 text-right text-cream-40 font-medium text-[10px] uppercase tracking-[0.08em]">Severity</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r) => (
              <tr key={r.risk} className="border-b border-cream-5">
                <td className="px-3 py-3 text-cream font-medium">{r.risk}</td>
                <td className="px-3 py-3 text-cream-60">{r.impact}</td>
                <td className="px-3 py-3 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${severityColors[r.severity]} ${severityBg[r.severity]}`}>
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
