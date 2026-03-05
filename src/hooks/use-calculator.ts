'use client';

import { useState, useMemo, useCallback } from 'react';
import type { CalculatorInputs, CalculatorResults, VerdictInfo, CalculatorMode, ValidatorData } from '@/lib/types';
import { DEFAULT_INPUTS } from '@/lib/constants';
import { calculateProfit, getVerdict } from '@/lib/calculations';

export function useCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [selectedValidator, setSelectedValidator] = useState<string | null>(null);

  const results: CalculatorResults = useMemo(() => calculateProfit(inputs), [inputs]);
  const verdict: VerdictInfo = useMemo(() => getVerdict(inputs, results), [inputs, results]);

  const updateInput = useCallback(<K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setMode = useCallback((mode: CalculatorMode) => {
    setInputs((prev) => {
      if (mode === 'delegator') {
        return {
          ...prev,
          mode,
          selfStake: 100000,
        };
      }
      return {
        ...prev,
        mode,
        selfStake: 1000000,
        totalStake: DEFAULT_INPUTS.totalStake,
      };
    });
    if (mode === 'delegator') {
      // Don't clear selected validator in delegator mode - they pick one from the table
    } else {
      setSelectedValidator(null);
    }
  }, []);

  const loadValidator = useCallback((v: ValidatorData) => {
    setSelectedValidator(v.name);
    if (inputs.mode === 'validator') {
      setInputs((prev) => ({
        ...prev,
        totalStake: v.totalStake,
        selfStake: v.selfStake,
        commission: v.commission,
        uptime: v.uptime,
      }));
    } else {
      // Delegator mode: set the validator's total stake and commission
      setInputs((prev) => ({
        ...prev,
        totalStake: v.totalStake,
        commission: v.commission,
        uptime: v.uptime,
      }));
    }
  }, [inputs.mode]);

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
