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

    const priceData = await priceRes.json();
    const validatorsData = await validatorsRes.json();

    const polPrice =
      priceData?.["polygon-ecosystem-token"]?.usd ?? DEFAULT_POL_PRICE;

    const allValidators = validatorsData?.result ?? [];
    const activeValidators = allValidators.filter(
      (v: Record<string, unknown>) => v.status === "active"
    );

    let totalStaked = 0;
    const validators = activeValidators.map(
      (v: Record<string, unknown>, i: number) => {
        const totalStake = Number(
          BigInt(String(v.totalStaked ?? "0")) / BigInt(10 ** 18)
        );
        const selfStake = Number(
          BigInt(String(v.selfStake ?? "0")) / BigInt(10 ** 18)
        );
        totalStaked += totalStake;
        return {
          name: (v.name as string) || `Validator ${v.id ?? i}`,
          totalStake,
          selfStake,
          commission: (v.commissionPercent as number) ?? 5,
          uptime: (v.uptimePercent as number) ?? 100,
        };
      }
    );

    return NextResponse.json({
      polPrice,
      networkStake: totalStaked,
      activeValidators: activeValidators.length,
      annualEmission: DEFAULT_ANNUAL_EMISSION,
      validators,
      updatedAt: new Date().toISOString(),
    });
  } catch {
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
