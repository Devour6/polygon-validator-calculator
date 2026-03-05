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
    <div className="glass-card p-6 mb-6">
      {/* Mode Toggle */}
      <div className="flex mb-6 bg-[rgba(243,238,217,0.05)] rounded-xl p-1">
        <button
          onClick={() => onModeChange('validator')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-[family-name:var(--font-body)] transition-all ${
            isValidator
              ? 'bg-[rgba(130,71,229,0.2)] text-cream border border-[rgba(130,71,229,0.3)]'
              : 'text-cream-40 hover:text-cream-60'
          }`}
        >
          Validator Operator
        </button>
        <button
          onClick={() => onModeChange('delegator')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-[family-name:var(--font-body)] transition-all ${
            !isValidator
              ? 'bg-[rgba(130,71,229,0.2)] text-cream border border-[rgba(130,71,229,0.3)]'
              : 'text-cream-40 hover:text-cream-60'
          }`}
        >
          Delegator
        </button>
      </div>

      <h3 className="font-[family-name:var(--font-display)] text-base text-cream mb-4">
        {isValidator ? 'Validator Parameters' : 'Delegation Parameters'}
      </h3>

      {/* Self Stake / Delegation Amount */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
            {isValidator ? 'Self Stake (POL)' : 'Delegation Amount (POL)'}
          </label>
          <span className="text-cream text-sm font-medium font-[family-name:var(--font-body)]">
            {fmt(inputs.selfStake)}
          </span>
        </div>
        <input
          type="range"
          min={isValidator ? 10000 : 1000}
          max={isValidator ? 10000000 : 5000000}
          step={isValidator ? 10000 : 1000}
          value={inputs.selfStake}
          onChange={(e) => onUpdate('selfStake', Number(e.target.value))}
        />
        <div className="flex justify-between text-cream-20 text-xs mt-1 font-[family-name:var(--font-body)]">
          <span>{isValidator ? '10K' : '1K'}</span>
          <span>{isValidator ? '10M' : '5M'}</span>
        </div>
      </div>

      {/* Total Stake - validator mode only */}
      {isValidator && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
              Total Stake (POL)
            </label>
            <span className="text-cream text-sm font-medium font-[family-name:var(--font-body)]">
              {fmt(inputs.totalStake)}
            </span>
          </div>
          <input
            type="range"
            min={10000}
            max={500000000}
            step={100000}
            value={inputs.totalStake}
            onChange={(e) => onUpdate('totalStake', Number(e.target.value))}
          />
          <div className="flex justify-between text-cream-20 text-xs mt-1 font-[family-name:var(--font-body)]">
            <span>10K</span>
            <span>500M</span>
          </div>
        </div>
      )}

      {/* Commission */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
            Commission
          </label>
          <span className="text-cream text-sm font-medium font-[family-name:var(--font-body)]">
            {inputs.commission}%
          </span>
        </div>
        {isValidator ? (
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={inputs.commission}
            onChange={(e) => onUpdate('commission', Number(e.target.value))}
          />
        ) : (
          <div className="h-1 bg-[rgba(243,238,217,0.12)] rounded-full overflow-hidden">
            <div
              className="h-full bg-cream-20 rounded-full"
              style={{ width: `${inputs.commission}%` }}
            />
          </div>
        )}
        <div className="flex justify-between text-cream-20 text-xs mt-1 font-[family-name:var(--font-body)]">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Uptime - validator mode only */}
      {isValidator && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
              Uptime
            </label>
            <span className="text-cream text-sm font-medium font-[family-name:var(--font-body)]">
              {inputs.uptime}%
            </span>
          </div>
          <input
            type="range"
            min={80}
            max={100}
            step={0.1}
            value={inputs.uptime}
            onChange={(e) => onUpdate('uptime', Number(e.target.value))}
          />
          <div className="flex justify-between text-cream-20 text-xs mt-1 font-[family-name:var(--font-body)]">
            <span>80%</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* POL Price */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
            POL Price (USD)
          </label>
          <span className="text-cream text-sm font-medium font-[family-name:var(--font-body)]">
            ${inputs.polPrice.toFixed(3)}
          </span>
        </div>
        <input
          type="range"
          min={0.01}
          max={2.0}
          step={0.005}
          value={inputs.polPrice}
          onChange={(e) => onUpdate('polPrice', Number(e.target.value))}
        />
        <div className="flex justify-between text-cream-20 text-xs mt-1 font-[family-name:var(--font-body)]">
          <span>$0.01</span>
          <span>$2.00</span>
        </div>
      </div>

      {/* Network Parameters */}
      <div className="border-t border-cream-8 pt-4 mt-4 mb-4">
        <h4 className="text-cream-40 text-xs uppercase tracking-wider mb-3 font-[family-name:var(--font-body)]">
          Network Parameters
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-cream-40 text-xs font-[family-name:var(--font-body)]">
              Network Staked
            </label>
            <input
              type="number"
              value={inputs.networkStake}
              onChange={(e) => onUpdate('networkStake', Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 bg-[rgba(243,238,217,0.05)] border border-cream-8 rounded-lg text-cream text-sm font-[family-name:var(--font-body)] focus:outline-none focus:border-cream-20"
            />
          </div>
          <div>
            <label className="text-cream-40 text-xs font-[family-name:var(--font-body)]">
              Annual Emission
            </label>
            <input
              type="number"
              value={inputs.annualEmission}
              onChange={(e) => onUpdate('annualEmission', Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 bg-[rgba(243,238,217,0.05)] border border-cream-8 rounded-lg text-cream text-sm font-[family-name:var(--font-body)] focus:outline-none focus:border-cream-20"
            />
          </div>
          <div>
            <label className="text-cream-40 text-xs font-[family-name:var(--font-body)]">
              Checkpoints/Day
            </label>
            <input
              type="number"
              value={inputs.checkpointsPerDay}
              onChange={(e) => onUpdate('checkpointsPerDay', Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 bg-[rgba(243,238,217,0.05)] border border-cream-8 rounded-lg text-cream text-sm font-[family-name:var(--font-body)] focus:outline-none focus:border-cream-20"
            />
          </div>
          <div>
            <label className="text-cream-40 text-xs font-[family-name:var(--font-body)]">
              Active Validators
            </label>
            <input
              type="number"
              value={inputs.activeValidators}
              onChange={(e) => onUpdate('activeValidators', Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 bg-[rgba(243,238,217,0.05)] border border-cream-8 rounded-lg text-cream text-sm font-[family-name:var(--font-body)] focus:outline-none focus:border-cream-20"
            />
          </div>
        </div>
      </div>

      {/* Operating Costs - validator mode only */}
      {isValidator && (
        <div className="border-t border-cream-8 pt-4 mt-4">
          <h4 className="text-cream-40 text-xs uppercase tracking-wider mb-3 font-[family-name:var(--font-body)]">
            Monthly Operating Costs (USD)
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
                  Server Costs
                </label>
                <span className="text-cream text-sm font-[family-name:var(--font-body)]">
                  ${inputs.serverCost}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2000}
                step={25}
                value={inputs.serverCost}
                onChange={(e) => onUpdate('serverCost', Number(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
                  ETH Gas Costs
                </label>
                <span className="text-cream text-sm font-[family-name:var(--font-body)]">
                  ${inputs.ethGasCost}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={10}
                value={inputs.ethGasCost}
                onChange={(e) => onUpdate('ethGasCost', Number(e.target.value))}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-cream-60 text-sm font-[family-name:var(--font-body)]">
                  Other Costs
                </label>
                <span className="text-cream text-sm font-[family-name:var(--font-body)]">
                  ${inputs.otherCosts}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                step={5}
                value={inputs.otherCosts}
                onChange={(e) => onUpdate('otherCosts', Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
