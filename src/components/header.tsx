'use client';

export function Header() {
  return (
    <header className="text-center mb-10 pb-7 border-b border-cream-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.08s' }}>
      <h1 className="font-display text-[32px] font-normal mb-2 text-cream tracking-[0.03em]">
        Polygon PoS Validator Calculator
      </h1>
      <p className="font-body text-cream-40 text-[15px] font-light">
        Validator and Delegator Profitability Analysis
      </p>

      <div className="bg-cream-5 border border-cream-8 rounded-[10px] px-[18px] py-[14px] text-xs text-cream-40 mt-6 leading-[1.7] font-light text-left">
        <strong className="text-cream-60 font-semibold">Polygon PoS:</strong>{' '}
        105 active validators. Checkpoint-based rewards on Ethereum L1. ~103.5M POL annual emission.
        57 checkpoints/day. 10% proposer bonus.{' '}
        <strong className="text-cream-60 font-semibold">Toggle modes</strong>{' '}
        &mdash; analyze as validator operator or delegator.
      </div>
    </header>
  );
}
