'use client';

import type { CalculatorInputs, CalculatorMode } from '@/lib/types';
import { fmt } from '@/lib/formatters';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onUpdate: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  onModeChange: (mode: CalculatorMode) => void;
}

export function CalculatorForm({ inputs, onUpdate, onModeChange }: CalculatorFormProps) {
  const isValidator = inputs.mode === 'validator';

  return (
    <div className="bg-cream-5 border border-cream-8 rounded-2xl p-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.24s' }}>
      {/* Mode Toggle */}
      <div className="flex mb-6 bg-dark border border-cream-8 rounded-xl p-1">
        <button
          onClick={() => onModeChange('validator')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-body transition-all ${
            isValidator
              ? 'bg-cream-12 text-cream border border-cream-20'
              : 'text-cream-40 hover:text-cream-60'
          }`}
        >
          Validator Operator
        </button>
        <button
          onClick={() => onModeChange('delegator')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-body transition-all ${
            !isValidator
              ? 'bg-cream-12 text-cream border border-cream-20'
              : 'text-cream-40 hover:text-cream-60'
          }`}
        >
          Delegator
        </button>
      </div>

      <h3 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-5">
        {isValidator ? 'Validator Parameters' : 'Delegation Parameters'}
      </h3>

      {/* Self Stake / Delegation Amount */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="selfStake" className="text-cream-60 text-[13px] font-body">
            {isValidator ? 'Self Stake (POL)' : 'Delegation Amount (POL)'}
          </label>
          <span className="text-cream text-sm font-medium font-body">{fmt(inputs.selfStake)}</span>
        </div>
        <input
          id="selfStake"
          type="range"
          aria-label={isValidator ? 'Self Stake' : 'Delegation Amount'}
          min={isValidator ? 10000 : 1000}
          max={isValidator ? 10000000 : 5000000}
          step={isValidator ? 10000 : 1000}
          value={inputs.selfStake}
          onChange={(e) => onUpdate('selfStake', Number(e.target.value))}
        />
        <div className="flex justify-between text-cream-20 text-xs mt-1 font-body">
          <span>{isValidator ? '10K' : '1K'}</span>
          <span>{isValidator ? '10M' : '5M'}</span>
        </div>
      </div>

      {/* Total Stake - validator mode only */}
      {isValidator && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="totalStake" className="text-cream-60 text-[13px] font-body">Total Stake (POL)</label>
            <span className="text-cream text-sm font-medium font-body">{fmt(inputs.totalStake)}</span>
          </div>
          <input id="totalStake" type="range" aria-label="Total Stake" min={10000} max={500000000} step={100000} value={inputs.totalStake} onChange={(e) => onUpdate('totalStake', Number(e.target.value))} />
          <div className="flex justify-between text-cream-20 text-xs mt-1 font-body"><span>10K</span><span>500M</span></div>
        </div>
      )}

      {/* Commission */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="commission" className="text-cream-60 text-[13px] font-body">Commission</label>
          <span className="text-cream text-sm font-medium font-body">{inputs.commission}%</span>
        </div>
        {isValidator ? (
          <input id="commission" type="range" aria-label="Commission" min={0} max={100} step={1} value={inputs.commission} onChange={(e) => onUpdate('commission', Number(e.target.value))} />
        ) : (
          <div className="h-1.5 bg-cream-8 rounded-full overflow-hidden">
            <div className="h-full bg-cream-20 rounded-full" style={{ width: `${inputs.commission}%` }} />
          </div>
        )}
      </div>

      {/* Uptime - validator mode only */}
      {isValidator && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="uptime" className="text-cream-60 text-[13px] font-body">Uptime</label>
            <span className="text-cream text-sm font-medium font-body">{inputs.uptime}%</span>
          </div>
          <input id="uptime" type="range" aria-label="Uptime" min={80} max={100} step={0.1} value={inputs.uptime} onChange={(e) => onUpdate('uptime', Number(e.target.value))} />
          <div className="flex justify-between text-cream-20 text-xs mt-1 font-body"><span>80%</span><span>100%</span></div>
        </div>
      )}

      {/* POL Price */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="polPrice" className="text-cream-60 text-[13px] font-body">POL Price (USD)</label>
          <span className="text-cream text-sm font-medium font-body">${inputs.polPrice.toFixed(3)}</span>
        </div>
        <input id="polPrice" type="range" aria-label="POL Price" min={0.01} max={2.0} step={0.005} value={inputs.polPrice} onChange={(e) => onUpdate('polPrice', Number(e.target.value))} />
        <div className="flex justify-between text-cream-20 text-xs mt-1 font-body"><span>$0.01</span><span>$2.00</span></div>
      </div>

      {/* Network Parameters */}
      <div className="border-t border-cream-8 pt-4 mt-4 mb-4">
        <div className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-20 mb-3">Network Parameters</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: 'Network Staked', key: 'networkStake' as const },
            { label: 'Annual Emission', key: 'annualEmission' as const },
            { label: 'Checkpoints/Day', key: 'checkpointsPerDay' as const },
            { label: 'Active Validators', key: 'activeValidators' as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label htmlFor={`np-${key}`} className="text-cream-40 text-xs font-body">{label}</label>
              <input
                id={`np-${key}`}
                type="number"
                aria-label={label}
                value={inputs[key]}
                onChange={(e) => onUpdate(key, Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 bg-dark border border-cream-8 rounded-lg text-cream text-sm font-body outline-none transition-all focus:border-cream-20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Operating Costs - validator mode only */}
      {isValidator && (
        <div className="border-t border-cream-8 pt-4 mt-4">
          <div className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-20 mb-3">Monthly Operating Costs (USD)</div>
          <div className="space-y-3">
            {[
              { label: 'Server Costs', key: 'serverCost' as const, max: 2000, step: 25 },
              { label: 'ETH Gas Costs', key: 'ethGasCost' as const, max: 1000, step: 10 },
              { label: 'Other Costs', key: 'otherCosts' as const, max: 500, step: 5 },
            ].map(({ label, key, max, step }) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={`cost-${key}`} className="text-cream-60 text-[13px] font-body">{label}</label>
                  <span className="text-cream text-sm font-body">${inputs[key]}</span>
                </div>
                <input id={`cost-${key}`} type="range" aria-label={label} min={0} max={max} step={step} value={inputs[key]} onChange={(e) => onUpdate(key, Number(e.target.value))} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
