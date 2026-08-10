import type { RemediationCategory } from "@app/client";
import { useFetchRecommendations } from "@app/queries/recommendations";
import { useMemo } from "react";

export type RemediationCounts = Map<RemediationCategory, number>;

export const useRemediationSummary = (purls: string[]) => {
  const { recommendationsMap, isFetching, fetchError } =
    useFetchRecommendations(purls);

  const remediationCounts = useMemo(() => {
    const counts: RemediationCounts = new Map();
    for (const entries of recommendationsMap.values()) {
      for (const entry of entries) {
        for (const vuln of entry.vulnerabilities) {
          for (const rem of vuln.remediations) {
            counts.set(rem.category, (counts.get(rem.category) ?? 0) + 1);
          }
        }
      }
    }
    return counts;
  }, [recommendationsMap]);

  const totalRemediations = useMemo(
    () => Array.from(remediationCounts.values()).reduce((a, b) => a + b, 0),
    [remediationCounts],
  );

  return { remediationCounts, totalRemediations, isFetching, fetchError };
};
