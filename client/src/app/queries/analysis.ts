import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { ExploitIQAnalysis } from "@app/api/models";
import { client } from "@app/axios-config/apiInit";
import {
  createExploitIqReport,
  fetchExploitIqReport,
  type ReportResult,
} from "@app/client";

export interface IAdvisoriesQueryParams {
  filterText?: string;
  offset?: number;
  limit?: number;
  sort_by?: string;
}

export const AnalysisQueryKey = "analysis";

export const useFetchAnalysisById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [AnalysisQueryKey, id],
    queryFn: () => fetchExploitIqReport({ client, path: { id } }),
    enabled: id !== undefined,
    refetchInterval: (query) => {
      const data = query.state.data?.data as ExploitIQAnalysis | undefined;
      return data?.output ? 0 : 10_000;
    },
  });

  return {
    analysis: data?.data as ExploitIQAnalysis | undefined,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};

export const useCreateAnalysisMutation = (
  onSuccess: (
    payload: { sbomId: string; vulnerabilityId: string },
    response?: ReportResult,
  ) => void,
  onError: (
    err: AxiosError,
    payload: {
      sbomId: string;
      vulnerabilityId: string;
    },
  ) => void,
) => {
  return useMutation({
    mutationFn: async (payload: {
      sbomId: string;
      vulnerabilityId: string;
    }) => {
      return await createExploitIqReport({
        client,
        path: { id: payload.sbomId },
        body: {
          vulnerabilities: [payload.vulnerabilityId],
        },
      });
    },
    onSuccess: (response, payload) => {
      onSuccess(payload, response.data);
    },
    onError,
  });
};
