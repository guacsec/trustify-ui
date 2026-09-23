import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { client } from "../axios-config/apiInit";
import { recommend } from "../client";
import type { RecommendEntry } from "../client";

export { type RecommendEntry };

/**
 * Local mirrors of RecommendReport* schemas from trustify PR #2656.
 * Defined here until the backend and openapi spec are backported to release/0.6.z.
 */
export type RecommendReportPackage = {
  advisory_id?: string | null;
  found_in: string[];
  purl: string;
  recommended_purl: string;
  vulnerabilities: string[];
};

export type RecommendReportImpactSummary = {
  addressable_packages: number;
  sboms_with_recommendations: number;
};

export type RecommendReportSbom = {
  addressable_packages: number;
  id: string;
  name: string;
  vulnerability_count: number;
};

export type RecommendReportResponse = {
  impact_summary: RecommendReportImpactSummary;
  packages: RecommendReportPackage[];
  sboms: RecommendReportSbom[];
};

export const RecommendationsQueryKey = "recommendations";

/** Batch-fetch vendor recommendations for the given PURLs via POST /api/v2/purl/recommend. */
export const useFetchRecommendations = (purls: string[]) => {
  const sortedPurls = useMemo(() => [...purls].sort(), [purls]);

  const { data, isLoading, error } = useQuery({
    queryKey: [RecommendationsQueryKey, sortedPurls],
    queryFn: () =>
      recommend({
        client,
        body: { purls: sortedPurls },
      }),
    enabled: sortedPurls.length > 0,
  });

  const recommendationsMap = useMemo(() => {
    const map = new Map<string, RecommendEntry[]>();
    const recs = data?.data?.recommendations;
    if (recs) {
      for (const [purl, entries] of Object.entries(recs)) {
        map.set(purl, entries);
      }
    }
    return map;
  }, [data]);

  return {
    recommendationsMap,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
  };
};

export const RemediationReportQueryKey = "remediation-report";

/**
 * Fetch an aggregated vendor remediation report for the given SBOM IDs
 * via POST /api/v3/purl/recommend/report.
 *
 * NOTE (backport release/0.6.z): endpoint not yet available on this stream.
 * Returns a permanently-loading stub until the backend is backported (trustify PR #2656).
 */
export const useFetchRemediationReport = (_sbomIds: string[]) => {
  return useMemo(
    () => ({
      report: null as RecommendReportResponse | null,
      isFetching: false,
      fetchError: null as AxiosError | null,
      isLimitExceeded: false,
    }),
    [],
  );
};
