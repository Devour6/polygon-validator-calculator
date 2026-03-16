import type { CalculatorInputs } from "./types";

export const DEFAULT_POL_PRICE = 0.105;
export const DEFAULT_NETWORK_STAKED = 3270000000;
export const DEFAULT_ANNUAL_EMISSION = 103530000;
export const DEFAULT_CHECKPOINTS_PER_DAY = 57;
export const DEFAULT_ACTIVE_VALIDATORS = 105;
export const MAX_VALIDATORS = 105;
export const PROPOSER_BONUS_PCT = 0.10;

export const DEFAULT_INPUTS: CalculatorInputs = {
  mode: 'validator',
  selfStake: 1000000,
  totalStake: 10000000,
  commission: 5,
  polPrice: DEFAULT_POL_PRICE,
  networkStake: DEFAULT_NETWORK_STAKED,
  annualEmission: DEFAULT_ANNUAL_EMISSION,
  checkpointsPerDay: DEFAULT_CHECKPOINTS_PER_DAY,
  activeValidators: DEFAULT_ACTIVE_VALIDATORS,
  uptime: 99.5,
  serverCost: 800,
  ethGasCost: 0,
  otherCosts: 0,
};
