'use client';

import { useState, useMemo } from 'react';
import type { SortColumn, SortDirection, ValidatorData } from '@/lib/types';
import { VALIDATORS } from '@/data/validators';

interface UseValidatorTableProps {
  calcProfit: (v: ValidatorData) => number;
  liveValidators?: ValidatorData[];
}

export function useValidatorTable({ calcProfit, liveValidators }: UseValidatorTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>('index');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortDirection(col === 'name' ? 'asc' : 'desc');
    }
  };

  const validators = liveValidators && liveValidators.length > 0
    ? liveValidators
    : VALIDATORS;

  const sortedValidators = useMemo(() => {
    const indexed = validators.map((v, i) => ({ ...v, originalIndex: i }));

    return [...indexed].sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case 'index':
          cmp = a.originalIndex - b.originalIndex;
          break;
        case 'name':
          cmp = a.name.localeCompare(b.name);
          break;
        case 'totalStake':
          cmp = a.totalStake - b.totalStake;
          break;
        case 'selfStake':
          cmp = a.selfStake - b.selfStake;
          break;
        case 'commission':
          cmp = a.commission - b.commission;
          break;
        case 'uptime':
          cmp = a.uptime - b.uptime;
          break;
        case 'profit':
          cmp = calcProfit(a) - calcProfit(b);
          break;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [validators, sortColumn, sortDirection, calcProfit]);

  return {
    sortColumn,
    sortDirection,
    sortedValidators,
    handleSort,
  };
}
