import type { CalculatorInputs, CalculatorResults, VerdictInfo, ValidatorData } from "./types";
import { PROPOSER_BONUS_PCT } from "./constants";

export function calculateProfit(inputs: CalculatorInputs): CalculatorResults {
  const {
    mode,
    selfStake,
    totalStake: inputTotalStake,
    commission,
    polPrice,
    networkStake,
    annualEmission,
    checkpointsPerDay,
    uptime,
    serverCost,
    ethGasCost,
    otherCosts,
  } = inputs;

  // Guard against division by zero — return zeroed results
  if (networkStake <= 0 || polPrice <= 0 || checkpointsPerDay <= 0) {
    const annualCostsUsd = mode === 'validator' ? (serverCost + ethGasCost + otherCosts) * 12 : 0;
    return {
      stakeShare: 0, dailyCheckpointRewards: 0, dailyProposerBonus: 0,
      dailyCommission: 0, dailySelfRewards: 0, dailyTotal: 0,
      annualRevenuePol: 0, annualRevenueUsd: 0, annualCostsUsd,
      netProfitUsd: -annualCostsUsd, monthlyProfitUsd: -annualCostsUsd / 12,
      effectiveApy: 0, grossApy: 0, rewardPerCheckpoint: 0,
    };
  }

  if (mode === 'delegator') {
    // Delegator mode: selfStake is the delegation amount
    const delegationAmount = selfStake;
    const validatorTotalStake = inputTotalStake;
    const stakeShare = validatorTotalStake / networkStake;
    const dailyEmission = annualEmission / 365;
    const rewardPerCheckpoint = dailyEmission / checkpointsPerDay;

    // Delegators don't get proposer bonus
    const dailyProposerBonus = 0;
    const dailyCheckpointRewards = dailyEmission * (1 - PROPOSER_BONUS_PCT) * stakeShare * (uptime / 100);
    const totalDailyRewards = dailyCheckpointRewards;

    // Delegator's share of rewards based on their delegation vs total stake
    const delegatorShareOfRewards = validatorTotalStake > 0
      ? totalDailyRewards * (delegationAmount / validatorTotalStake)
      : 0;

    // Commission is deducted from delegator's share (applied via multiplier below, not tracked separately)
    const dailyCommission = 0;
    const dailySelfRewards = delegatorShareOfRewards * (1 - commission / 100);

    const dailyTotal = dailySelfRewards;
    const annualRevenuePol = dailyTotal * 365;
    const annualRevenueUsd = annualRevenuePol * polPrice;
    const annualCostsUsd = 0; // Delegators have no operational costs
    const netProfitUsd = annualRevenueUsd - annualCostsUsd;
    const monthlyProfitUsd = netProfitUsd / 12;

    const investmentUsd = delegationAmount * polPrice;
    const effectiveApy = investmentUsd > 0 ? (netProfitUsd / investmentUsd) * 100 : 0;
    const grossApy = investmentUsd > 0 ? (annualRevenueUsd / investmentUsd) * 100 : 0;

    return {
      stakeShare,
      dailyCheckpointRewards: dailySelfRewards, // Show delegator's portion
      dailyProposerBonus,
      dailyCommission,
      dailySelfRewards,
      dailyTotal,
      annualRevenuePol,
      annualRevenueUsd,
      annualCostsUsd,
      netProfitUsd,
      monthlyProfitUsd,
      effectiveApy,
      grossApy,
      rewardPerCheckpoint,
    };
  }

  // Validator mode
  const stakeShare = inputTotalStake / networkStake;
  const dailyEmission = annualEmission / 365;
  const rewardPerCheckpoint = dailyEmission / checkpointsPerDay;

  const dailyProposerBonus =
    checkpointsPerDay * rewardPerCheckpoint * PROPOSER_BONUS_PCT * stakeShare * (uptime / 100);
  const dailyCheckpointRewards =
    dailyEmission * (1 - PROPOSER_BONUS_PCT) * stakeShare * (uptime / 100);
  const totalDailyRewards = dailyCheckpointRewards + dailyProposerBonus;

  const delegatedStake = Math.max(0, inputTotalStake - selfStake);
  const delegatorRewardShare =
    inputTotalStake > 0 ? totalDailyRewards * (delegatedStake / inputTotalStake) : 0;
  const dailyCommission = delegatorRewardShare * (commission / 100);
  const dailySelfRewards =
    inputTotalStake > 0 ? totalDailyRewards * (selfStake / inputTotalStake) : 0;

  const dailyTotal = dailyCommission + dailySelfRewards;
  const annualRevenuePol = dailyTotal * 365;
  const annualRevenueUsd = annualRevenuePol * polPrice;
  const annualCostsUsd = (serverCost + ethGasCost + otherCosts) * 12;
  const netProfitUsd = annualRevenueUsd - annualCostsUsd;
  const monthlyProfitUsd = netProfitUsd / 12;

  const investmentUsd = selfStake * polPrice;
  const effectiveApy = investmentUsd > 0 ? (netProfitUsd / investmentUsd) * 100 : 0;
  const grossApy = investmentUsd > 0 ? (annualRevenueUsd / investmentUsd) * 100 : 0;

  return {
    stakeShare,
    dailyCheckpointRewards,
    dailyProposerBonus,
    dailyCommission,
    dailySelfRewards,
    dailyTotal,
    annualRevenuePol,
    annualRevenueUsd,
    annualCostsUsd,
    netProfitUsd,
    monthlyProfitUsd,
    effectiveApy,
    grossApy,
    rewardPerCheckpoint,
  };
}

export function calculateTableProfit(v: ValidatorData, inputs: CalculatorInputs): number {
  if (v.totalStake <= 0 || inputs.networkStake <= 0 || inputs.polPrice <= 0) return 0;
  const stakeShare = v.totalStake / inputs.networkStake;
  const dailyEmission = inputs.annualEmission / 365;
  const rewardPerCheckpoint = dailyEmission / inputs.checkpointsPerDay;

  const dailyProposerBonus =
    inputs.checkpointsPerDay * rewardPerCheckpoint * PROPOSER_BONUS_PCT * stakeShare * (v.uptime / 100);
  const dailyCheckpointRewards =
    dailyEmission * (1 - PROPOSER_BONUS_PCT) * stakeShare * (v.uptime / 100);
  const totalDailyRewards = dailyCheckpointRewards + dailyProposerBonus;

  const delegatedStake = Math.max(0, v.totalStake - v.selfStake);
  const delegatorRewardShare =
    v.totalStake > 0 ? totalDailyRewards * (delegatedStake / v.totalStake) : 0;
  const dailyCommission = delegatorRewardShare * (v.commission / 100);
  const dailySelfRewards =
    v.totalStake > 0 ? totalDailyRewards * (v.selfStake / v.totalStake) : 0;

  const dailyTotal = dailyCommission + dailySelfRewards;
  const annualRevenuePol = dailyTotal * 365;
  const annualRevenueUsd = annualRevenuePol * inputs.polPrice;
  const annualCostsUsd = (inputs.serverCost + inputs.ethGasCost + inputs.otherCosts) * 12;

  return annualRevenueUsd - annualCostsUsd;
}

export function calculateBreakevenStake(
  selfStake: number,
  commissionPct: number,
  polPrice: number,
  networkStake: number,
  annualEmission: number,
  uptime: number,
  serverCost: number,
  ethGasCost: number,
  otherCosts: number
): number {
  if (polPrice <= 0 || networkStake <= 0 || uptime <= 0) return selfStake;

  const c = commissionPct / 100;
  const u = uptime / 100;
  const dailyEmission = annualEmission / 365;
  const factor = (dailyEmission * u) / networkStake;
  const annualCosts = (serverCost + ethGasCost + otherCosts) * 12;
  const dailyNeeded = annualCosts / (365 * polPrice);

  if (dailyNeeded <= 0) return selfStake;
  if (factor <= 0) return selfStake;

  if (c <= 0 || c >= 1) {
    return selfStake;
  }

  const breakeven = (dailyNeeded / factor - selfStake * (1 - c)) / c;
  return Math.max(Math.round(breakeven), selfStake);
}

export function getVerdict(inputs: CalculatorInputs, results: CalculatorResults): VerdictInfo {
  if (inputs.mode === 'delegator') {
    const apy = results.effectiveApy;
    if (apy > 3) {
      return {
        type: 'profitable',
        title: 'Competitive Yield',
        detail: `At ${apy.toFixed(2)}% effective APY, this delegation offers competitive returns relative to the Polygon network average. The validator's commission rate and uptime support solid delegator earnings.`,
      };
    }
    if (apy > 1) {
      return {
        type: 'marginal',
        title: 'Below Average Yield',
        detail: `At ${apy.toFixed(2)}% effective APY, this delegation is below the network average. Consider validators with lower commission rates or higher total stake for better returns.`,
      };
    }
    return {
      type: 'unprofitable',
      title: 'Low Yield',
      detail: `At ${apy.toFixed(2)}% effective APY, this delegation provides minimal returns. The validator's high commission rate or low performance significantly reduces delegator rewards.`,
    };
  }

  // Validator mode — verdict thresholds
  const VERDICT_PROFITABLE = 5000;
  const netProfit = results.netProfitUsd;
  if (netProfit > VERDICT_PROFITABLE) {
    return {
      type: 'profitable',
      title: 'Profitable Operation',
      detail: `With net annual profit of $${Math.round(netProfit).toLocaleString()}, this validator configuration is profitable. Operating costs are well covered by checkpoint rewards and commission income.`,
    };
  }
  if (netProfit > 0) {
    return {
      type: 'marginal',
      title: 'Marginally Profitable',
      detail: `With net annual profit of $${Math.round(netProfit).toLocaleString()}, this validator barely covers operating costs. Consider increasing delegated stake or reducing expenses to improve margins.`,
    };
  }
  return {
    type: 'unprofitable',
    title: 'Unprofitable Operation',
    detail: `This configuration results in an annual loss of $${Math.round(Math.abs(netProfit)).toLocaleString()}. Operating costs exceed reward income. Increase total stake, reduce costs, or reconsider running a validator at this scale.`,
  };
}

export function getProfitColorClass(profit: number): string {
  if (profit > 10000) return 'profit-high';
  if (profit > 5000) return 'profit-mid';
  if (profit > 1000) return 'profit-low';
  if (profit > 0) return 'profit-marginal';
  if (profit > -2000) return 'profit-negative-low';
  return 'profit-negative';
}
