import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { client } from "../axios-config/apiInit";
import { recommend } from "../client";
import type { RecommendEntry } from "../client";

export const RecommendationsQueryKey = "recommendations";

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
