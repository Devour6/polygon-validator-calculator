'use client';

import type { CalculatorInputs, CalculatorMode, SortColumn, ValidatorData } from '@/lib/types';
import { fmtCompact, fmtUsd } from '@/lib/formatters';
import { calculateTableProfit, getProfitColorClass } from '@/lib/calculations';
import { useValidatorTable } from '@/hooks/use-validator-table';
import { useCallback, useState } from 'react';

interface ValidatorTableProps {
  inputs: CalculatorInputs;
  mode: CalculatorMode;
  selectedValidator: string | null;
  onSelect: (v: ValidatorData) => void;
  liveValidators?: ValidatorData[];
}

export function ValidatorTable({ inputs, mode, selectedValidator, onSelect, liveValidators }: ValidatorTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const calcProfit = useCallback(
    (v: ValidatorData) => calculateTableProfit(v, inputs),
    [inputs]
  );

  const { sortColumn, sortDirection, sortedValidators, handleSort } = useValidatorTable({
    calcProfit,
    liveValidators,
  });

  const filtered = searchTerm
    ? sortedValidators.filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : sortedValidators;

  const columns: { key: SortColumn; label: string; align?: string }[] = [
    { key: 'index', label: '#', align: 'center' },
    { key: 'name', label: 'Validator' },
    { key: 'totalStake', label: 'Total Stake', align: 'right' },
    { key: 'selfStake', label: 'Self Stake', align: 'right' },
    { key: 'commission', label: 'Commission', align: 'right' },
    { key: 'uptime', label: 'Uptime', align: 'right' },
    { key: 'profit', label: 'Est. Annual Profit', align: 'right' },
  ];

  return (
    <div className="bg-cream-5 border border-cream-8 rounded-2xl p-6 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.32s' }}>
      <h2 className="font-display text-[11px] font-normal uppercase tracking-[0.12em] text-cream-40 mb-5">
        Active Validators
      </h2>

      {/* Search */}
      <div className="relative mb-[18px]">
        <svg className="absolute top-1/2 left-[14px] -translate-y-1/2 w-4 h-4 text-cream-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          aria-label="Search validators"
          className="w-full py-3 pr-4 pl-10 bg-dark border border-cream-8 rounded-[10px] text-cream text-sm font-body outline-none transition-all placeholder:text-cream-20 focus:border-cream-20"
          placeholder="Search validators..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table with scroll */}
      <div className="max-h-[560px] overflow-y-auto overflow-x-auto rounded-xl border border-cream-8">
        <table className="w-full border-collapse min-w-[720px]">
          <thead className="sticky top-0 z-[2]">
            <tr>
              {columns.map(({ key, label, align }) => (
                <th
                  key={key}
                  role="button"
                  tabIndex={0}
                  aria-sort={sortColumn === key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
                  onClick={() => handleSort(key)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSort(key); } }}
                  className={`font-display text-[10px] font-normal uppercase tracking-[0.08em] text-cream-40 py-[14px] px-4 bg-dark border-b border-cream-8 whitespace-nowrap cursor-pointer select-none transition-colors hover:text-cream-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream-40 ${
                    align === 'center' ? 'text-center w-[44px]' : align === 'right' ? 'text-right' : 'text-left'
                  } ${sortColumn === key ? 'text-cream-60' : ''}`}
                >
                  {label}{' '}
                  <span className={`inline-block ml-1 text-[9px] transition-opacity ${sortColumn === key ? 'opacity-100 text-cream' : 'opacity-40'}`}>
                    {sortColumn === key ? (sortDirection === 'asc' ? '\u25B2' : '\u25BC') : ''}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length} role="status" className="py-8 text-center text-cream-20 text-sm font-body">No validators found</td></tr>
            )}
            {filtered.map((v, j) => {
              const profit = calcProfit(v);
              const profitClass = getProfitColorClass(profit);
              const isSelected = selectedValidator === v.name;

              return (
                <tr
                  key={v.originalIndex}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select validator ${v.name}`}
                  onClick={() => onSelect(v)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(v); } }}
                  className={`cursor-pointer transition-all border-b border-cream-5 border-l-[3px] hover:bg-cream-5 focus-visible:bg-cream-5 focus-visible:outline-none opacity-0 animate-row-fade ${
                    isSelected ? 'bg-cream-8 border-l-phase-green' : 'border-l-transparent'
                  }`}
                  style={{ animationDelay: `${Math.min(j * 12, 600)}ms` }}
                >
                  <td className="py-[11px] px-4 text-[11px] font-light text-cream-20 text-center">{j + 1}</td>
                  <td className="py-[11px] px-4 text-[13px] font-medium text-cream whitespace-nowrap">{v.name}</td>
                  <td className="py-[11px] px-4 text-[13px] text-cream-60 text-right whitespace-nowrap">{fmtCompact(v.totalStake)}</td>
                  <td className="py-[11px] px-4 text-[13px] text-cream-60 text-right whitespace-nowrap">{fmtCompact(v.selfStake)}</td>
                  <td className="py-[11px] px-4 text-[13px] text-cream-60 text-right whitespace-nowrap">{v.commission}%</td>
                  <td className="py-[11px] px-4 text-[13px] text-cream-60 text-right whitespace-nowrap">{v.uptime}%</td>
                  <td className={`py-[11px] px-4 text-[13px] font-semibold text-right whitespace-nowrap ${profitClass}`}>{fmtUsd(profit)}/yr</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-[14px] text-[11px] text-cream-20 font-light leading-[1.5]">
        {mode === 'validator'
          ? 'Click any row to load into calculator. Profit assumes default cost structure.'
          : 'Click any row to calculate delegation returns for that validator.'}
      </p>
    </div>
  );
}
