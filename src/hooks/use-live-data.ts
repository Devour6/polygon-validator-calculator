"use client";

import { useState, useEffect } from "react";
import type { ValidatorData } from "@/lib/types";

export interface LiveData {
  polPrice: number;
  networkStake: number;
  activeValidators: number;
  annualEmission: number;
  validators: ValidatorData[];
  updatedAt: string | null;
}

export function useLiveData() {
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    fetch("/api/live-data", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => {
        if (controller.signal.aborted || !mounted) return;
        console.error("Live data fetch failed:", err);
        if (mounted) setData(null);
      })
      .finally(() => {
        clearTimeout(timeoutId);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return { data, loading };
}
