import { NextResponse } from "next/server";
import {
  DEFAULT_POL_PRICE,
  DEFAULT_NETWORK_STAKED,
  DEFAULT_ACTIVE_VALIDATORS,
  DEFAULT_ANNUAL_EMISSION,
} from "@/lib/constants";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function GET() {
  try {
    const [priceRes, validatorsRes] = await Promise.all([
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=polygon-ecosystem-token&vs_currencies=usd",
        { next: { revalidate: 300 } }
      ),
      fetch(
        "https://staking-api.polygon.technology/api/v2/validators?limit=200&offset=0",
        { next: { revalidate: 300 } }
      ),
    ]);

    // Handle each response independently — one failure doesn't kill the other
    let polPrice = DEFAULT_POL_PRICE;
    if (priceRes.ok) {
      const priceData = await priceRes.json();
      const rawPrice = priceData?.["polygon-ecosystem-token"]?.usd;
      polPrice = typeof rawPrice === 'number' && isFinite(rawPrice) && rawPrice > 0
        ? rawPrice
        : DEFAULT_POL_PRICE;
    }

    let validators: { name: string; totalStake: number; selfStake: number; commission: number; uptime: number }[] = [];
    let totalStaked = DEFAULT_NETWORK_STAKED;
    let validatorCount = DEFAULT_ACTIVE_VALIDATORS;

    if (validatorsRes.ok) {
      const validatorsData = await validatorsRes.json();
      const allValidators = validatorsData?.result ?? [];
      const activeValidators = allValidators.filter(
        (v: Record<string, unknown>) => v.status === "active"
      );

      totalStaked = 0;
      validators = activeValidators.map(
        (v: Record<string, unknown>, i: number) => {
          // totalStaked comes as a float in wei (e.g., 4.386e+24)
          const rawTotal = Number(v.totalStaked ?? 0) / 1e18;
          const rawSelf = Number(v.selfStake ?? 0) / 1e18;
          const totalStake = isFinite(rawTotal) ? Math.max(0, Math.round(rawTotal)) : 0;
          const selfStake = isFinite(rawSelf) ? Math.max(0, Math.round(rawSelf)) : 0;
          totalStaked += totalStake;
          const commission = typeof v.commissionPercent === "number" ? v.commissionPercent : 5;
          const uptime = typeof v.uptimePercent === "number" ? v.uptimePercent : 100;
          return {
            name: typeof v.name === "string" && v.name ? v.name : `Validator ${v.id ?? i}`,
            totalStake,
            selfStake,
            commission,
            uptime,
          };
        }
      );
      validatorCount = activeValidators.length;
    }

    // Only mark as live if at least one upstream responded successfully
    const isLive = priceRes.ok || validatorsRes.ok;

    return NextResponse.json({
      polPrice,
      networkStake: totalStaked,
      activeValidators: validatorCount,
      annualEmission: DEFAULT_ANNUAL_EMISSION,
      validators,
      updatedAt: isLive ? new Date().toISOString() : null,
    });
  } catch (err) {
    console.error("Live data fetch error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({
      polPrice: DEFAULT_POL_PRICE,
      networkStake: DEFAULT_NETWORK_STAKED,
      activeValidators: DEFAULT_ACTIVE_VALIDATORS,
      annualEmission: DEFAULT_ANNUAL_EMISSION,
      validators: [],
      updatedAt: null,
    });
  }
}
