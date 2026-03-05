export interface ValidatorData {
  name: string;
  totalStake: number;
  selfStake: number;
  commission: number;
  uptime: number;
}

export type CalculatorMode = 'validator' | 'delegator';

export interface CalculatorInputs {
  mode: CalculatorMode;
  selfStake: number;
  totalStake: number;
  commission: number;
  polPrice: number;
  networkStake: number;
  annualEmission: number;
  checkpointsPerDay: number;
  activeValidators: number;
  uptime: number;
  serverCost: number;
  ethGasCost: number;
  otherCosts: number;
}

export interface CalculatorResults {
  stakeShare: number;
  dailyCheckpointRewards: number;
  dailyProposerBonus: number;
  dailyCommission: number;
  dailySelfRewards: number;
  dailyTotal: number;
  annualRevenuePol: number;
  annualRevenueUsd: number;
  annualCostsUsd: number;
  netProfitUsd: number;
  monthlyProfitUsd: number;
  effectiveApy: number;
  grossApy: number;
  rewardPerCheckpoint: number;
}

export type Verdict = 'profitable' | 'marginal' | 'unprofitable';

export interface VerdictInfo {
  type: Verdict;
  title: string;
  detail: string;
}

export type SortColumn = 'index' | 'name' | 'totalStake' | 'selfStake' | 'commission' | 'uptime' | 'profit';
export type SortDirection = 'asc' | 'desc';
