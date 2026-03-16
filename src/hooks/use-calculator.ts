'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { CalculatorInputs, CalculatorResults, VerdictInfo, CalculatorMode, ValidatorData } from '@/lib/types';
import { DEFAULT_INPUTS } from '@/lib/constants';
import { calculateProfit, getVerdict, calculateBreakevenStake } from '@/lib/calculations';
import type { LiveData } from '@/hooks/use-live-data';

export function useCalculator(liveData?: LiveData | null) {
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const defaults = { ...DEFAULT_INPUTS };
    defaults.totalStake = calculateBreakevenStake(
      defaults.selfStake, defaults.commission, defaults.polPrice,
      defaults.networkStake, defaults.annualEmission, defaults.uptime,
      defaults.serverCost, defaults.ethGasCost, defaults.otherCosts
    );
    return defaults;
  });
  const [selectedValidator, setSelectedValidator] = useState<string | null>(null);
  const [isBreakeven, setIsBreakeven] = useState(true);
  const [lastLiveTs, setLastLiveTs] = useState<string | null>(null);

  // When live data arrives (or refreshes), update economic params
  useEffect(() => {
    if (!liveData?.updatedAt || liveData.updatedAt === lastLiveTs) return;
    setLastLiveTs(liveData.updatedAt);
    setInputs(prev => ({
      ...prev,
      polPrice: liveData.polPrice,
      networkStake: liveData.networkStake,
      activeValidators: liveData.activeValidators,
      annualEmission: liveData.annualEmission,
    }));
  }, [liveData, lastLiveTs]);

  // Auto-update totalStake to breakeven when economic params change (validator mode only)
  useEffect(() => {
    if (!isBreakeven || inputs.mode !== 'validator') return;
    const breakevenStake = calculateBreakevenStake(
      inputs.selfStake, inputs.commission, inputs.polPrice,
      inputs.networkStake, inputs.annualEmission, inputs.uptime,
      inputs.serverCost, inputs.ethGasCost, inputs.otherCosts
    );
    const rounded = Math.round(breakevenStake);
    setInputs(prev => {
      if (prev.totalStake === rounded) return prev;
      return { ...prev, totalStake: rounded };
    });
  }, [isBreakeven, inputs.mode, inputs.selfStake, inputs.commission, inputs.polPrice,
      inputs.networkStake, inputs.annualEmission, inputs.uptime,
      inputs.serverCost, inputs.ethGasCost, inputs.otherCosts]);

  const results: CalculatorResults = useMemo(() => calculateProfit(inputs), [inputs]);
  const verdict: VerdictInfo = useMemo(() => getVerdict(inputs, results), [inputs, results]);

  const updateInput = useCallback(<K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    if (key === 'totalStake') {
      setIsBreakeven(false);
    }
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setMode = useCallback((mode: CalculatorMode) => {
    if (mode === 'delegator') {
      setSelectedValidator(null);
      setIsBreakeven(false);
      setInputs((prev) => ({ ...prev, mode, selfStake: 100000 }));
    } else {
      setIsBreakeven(true);
      setSelectedValidator(null);
      setInputs((prev) => ({ ...prev, mode, selfStake: 1000000 }));
      // totalStake will be auto-set by the breakeven effect
    }
  }, []);

  const loadValidator = useCallback((v: ValidatorData) => {
    setSelectedValidator(v.name);
    setIsBreakeven(false);
    setInputs((prev) => {
      if (prev.mode === 'validator') {
        return {
          ...prev,
          totalStake: v.totalStake,
          selfStake: v.selfStake,
          commission: v.commission,
          uptime: v.uptime,
        };
      }
      return {
        ...prev,
        totalStake: v.totalStake,
        commission: v.commission,
        uptime: v.uptime,
      };
    });
  }, []);

  return {
    inputs,
    results,
    verdict,
    selectedValidator,
    updateInput,
    setMode,
    loadValidator,
  };
}
