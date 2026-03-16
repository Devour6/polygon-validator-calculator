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
    const controller = new AbortController();
    fetch("/api/live-data", { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {
        if (!controller.signal.aborted) setData(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { data, loading };
}
