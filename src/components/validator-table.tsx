'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import type { CalculatorInputs, CalculatorMode, SortColumn, ValidatorData } from '@/lib/types';
import { fmtCompact, fmtUsd } from '@/lib/formatters';
import { calculateTableProfit, getProfitColorClass } from '@/lib/calculations';
import { useValidatorTable } from '@/hooks/use-validator-table';
import { useCallback } from 'react';

interface ValidatorTableProps {
  inputs: CalculatorInputs;
  mode: CalculatorMode;
  selectedValidator: string | null;
  onSelect: (v: ValidatorData) => void;
}

export function ValidatorTable({ inputs, mode, selectedValidator, onSelect }: ValidatorTableProps) {
  const calcProfit = useCallback(
    (v: ValidatorData) => calculateTableProfit(v, inputs),
    [inputs]
  );

  const { sortColumn, sortDirection, sortedValidators, handleSort } = useValidatorTable({
    calcProfit,
  });

  const SortIcon = ({ col }: { col: SortColumn }) => {
    if (sortColumn !== col) return <span className="w-3" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  };

  const columns: { key: SortColumn; label: string; className?: string }[] = [
    { key: 'index', label: '#', className: 'w-12 text-center' },
    { key: 'name', label: 'Validator', className: 'text-left' },
    { key: 'totalStake', label: 'Total Stake', className: 'text-right' },
    { key: 'selfStake', label: 'Self Stake', className: 'text-right' },
    { key: 'commission', label: 'Commission', className: 'text-right' },
    { key: 'uptime', label: 'Uptime', className: 'text-right' },
    { key: 'profit', label: 'Est. Annual Profit', className: 'text-right' },
  ];

  return (
    <div className="relative z-10 glass-card overflow-hidden mb-8">
      <div className="p-4 border-b border-cream-8">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-cream">
          Active Validators
        </h2>
        <p className="text-cream-40 text-sm mt-1 font-[family-name:var(--font-body)]">
          {mode === 'validator'
            ? 'Click a validator to load their parameters into the calculator'
            : 'Click a validator to calculate delegation returns'}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-body)]">
          <thead>
            <tr className="border-b border-cream-8">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-3 text-cream-40 font-medium text-xs uppercase tracking-wider cursor-pointer hover:text-cream-60 transition-colors select-none ${col.className || ''}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedValidators.map((v) => {
              const profit = calcProfit(v);
              const profitClass = getProfitColorClass(profit);
              const isSelected = selectedValidator === v.name;

              return (
                <tr
                  key={v.originalIndex}
                  onClick={() => onSelect(v)}
                  className={`border-b border-cream-5 table-row-hover cursor-pointer ${
                    isSelected ? 'bg-[rgba(130,71,229,0.1)] border-l-2 border-l-phase-purple' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-center text-cream-40">
                    {v.originalIndex + 1}
                  </td>
                  <td className="px-4 py-3 text-cream font-medium">
                    {v.name}
                  </td>
                  <td className="px-4 py-3 text-right text-cream-60">
                    {fmtCompact(v.totalStake)}
                  </td>
                  <td className="px-4 py-3 text-right text-cream-60">
                    {fmtCompact(v.selfStake)}
                  </td>
                  <td className="px-4 py-3 text-right text-cream-60">
                    {v.commission}%
                  </td>
                  <td className="px-4 py-3 text-right text-cream-60">
                    {v.uptime}%
                  </td>
                  <td className={`px-4 py-3 text-right font-medium ${profitClass}`}>
                    {fmtUsd(profit)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
