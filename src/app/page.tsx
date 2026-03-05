'use client';

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
    <div className="relative z-10 min-h-screen px-6 pt-8 pb-6">
      <div className="max-w-[1340px] mx-auto">
        <Header />
        <StatsBar />

        {/* Calculator + Results — THE MAIN EVENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CalculatorForm
            inputs={inputs}
            onUpdate={updateInput}
            onModeChange={setMode}
          />
          <div className="flex flex-col gap-5">
            <VerdictCard verdict={verdict} />
            <ResultsPanel inputs={inputs} results={results} />
            <RevenueBreakdown inputs={inputs} results={results} />
          </div>
        </div>

        {/* Validator Table — below calculator, with scroll */}
        <ValidatorTable
          inputs={inputs}
          mode={inputs.mode}
          selectedValidator={selectedValidator}
          onSelect={loadValidator}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-8">
          <KeyAssumptions />
          <RiskFactors />
        </div>

        <Footer />
      </div>
    </div>
  );
}
