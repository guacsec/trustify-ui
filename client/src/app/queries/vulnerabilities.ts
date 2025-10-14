import { useQueries, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";
import { client } from "@app/axios-config/apiInit";
import {
  type AnalysisResponse,
  analyze,
  getVulnerability,
  listVulnerabilities,
} from "@app/client";
import { requestParamsQuery } from "@app/hooks/table-controls";

export const VulnerabilitiesQueryKey = "vulnerabilities";

export const useFetchVulnerabilities = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [VulnerabilitiesQueryKey, params],
    queryFn: () => {
      return listVulnerabilities({
        client,
        query: { ...requestParamsQuery(params) },
      });
    },
    enabled: !disableQuery,
  });
  return {
    result: {
      data: data?.data?.items || [],
      total: data?.data?.total ?? 0,
      params: params,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
    refetch,
  };
};

export const useFetchVulnerabilitiesByPackageIds = (ids: string[]) => {
  const chunks = {
    ids: ids.reduce<string[][]>((chunks, item, index) => {
      if (index % 100 === 0) {
        chunks.push([item]);
      } else {
        chunks[chunks.length - 1].push(item);
      }
      return chunks;
    }, []),
    dataResolver: async (ids: string[]) => {
      const response = await analyze({
        client,
        body: { purls: ids },
      });
      return response.data;
    },
  };

  const userQueries = useQueries({
    queries: chunks.ids.map((ids) => {
      return {
        queryKey: [VulnerabilitiesQueryKey, ids],
        queryFn: () => chunks.dataResolver(ids),
        retry: false,
      };
    }),
  });

  const isFetching = userQueries.some(({ isFetching }) => isFetching);
  const fetchError = userQueries.find(({ error }) => !!error);

  const analysisResponse: AnalysisResponse = {};

  if (!isFetching) {
    for (const data of userQueries.map((item) => item?.data ?? {})) {
      for (const [id, analysisDetails] of Object.entries(data)) {
        analysisResponse[id] = analysisDetails;
      }
    }
  }

  return {
    analysisResponse,
    isFetching,
    fetchError: (fetchError?.error ?? undefined) as AxiosError | undefined,
  };
};

export const useFetchVulnerabilityById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [VulnerabilitiesQueryKey, id],
    queryFn: () => getVulnerability({ client, path: { id } }),
  });
  return {
    vulnerability: data?.data,
    isFetching: isLoading,
    fetchError: error as AxiosError | null,
  };
};
