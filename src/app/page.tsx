'use client';

import { useCallback } from 'react';
import { Header } from '@/components/header';
import { StatsBar } from '@/components/stats-bar';
import { ValidatorTable } from '@/components/validator-table';
import { CalculatorForm } from '@/components/calculator-form';
import { ResultsPanel } from '@/components/results-panel';
import { VerdictCard } from '@/components/verdict-card';
import { RevenueBreakdown } from '@/components/revenue-breakdown';
import { KeyAssumptions } from '@/components/key-assumptions';
import { RiskFactors } from '@/components/risk-factors';
import { Footer } from '@/components/footer';
import { useCalculator } from '@/hooks/use-calculator';

export default function Home() {
  const {
    inputs,
    results,
    verdict,
    selectedValidator,
    updateInput,
    setMode,
    loadValidator,
  } = useCalculator();

  return (
    <div className="relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <StatsBar />

        <ValidatorTable
          inputs={inputs}
          mode={inputs.mode}
          selectedValidator={selectedValidator}
          onSelect={loadValidator}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left column: Calculator form */}
          <div className="lg:col-span-5">
            <CalculatorForm
              inputs={inputs}
              onUpdate={updateInput}
              onModeChange={setMode}
            />
          </div>

          {/* Right column: Results */}
          <div className="lg:col-span-7">
            <VerdictCard verdict={verdict} />
            <ResultsPanel inputs={inputs} results={results} />
            <RevenueBreakdown inputs={inputs} results={results} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <KeyAssumptions />
          <RiskFactors />
        </div>

        <Footer />
      </div>
    </div>
  );
}
