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
    fetch("/api/live-data")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
