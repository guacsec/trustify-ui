import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { HubRequestParams } from "@app/api/models";

import { client } from "../axios-config/apiInit";
import { getPurl, listPackages, listPurl } from "../client";
import { requestParamsQuery } from "../hooks/table-controls";

export const PackagesQueryKey = "packages";

export const useFetchPackages = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PackagesQueryKey, params],
    queryFn: () =>
      listPurl({
        client: client,
        query: { ...requestParamsQuery(params) },
      }),
    enabled: !disableQuery,
  });

  return {
    result: {
      data: data?.data?.items || [],
      total: data?.data?.total ?? 0,
      params: params,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError,
    refetch,
  };
};

export const useFetchPackagesDetails = (
  params: HubRequestParams = {},
  disableQuery = false,
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PackagesQueryKey, params],
    queryFn: async () => {
      const listResponse = await listPurl({
        client: client,
        query: { ...requestParamsQuery(params) },
      });
      const items = listResponse?.data?.items || [];
      const details = await Promise.all(
        items.map((pkg) =>
          getPurl({ client, path: { key: pkg.uuid } }).then((res) => res.data),
        ),
      );
      return {
        items: items.map((pkg, idx) => ({
          ...pkg,
          ...(details[idx] || {}),
        })),
        total: listResponse?.data?.total ?? 0,
      };
    },
    enabled: !disableQuery,
  });

  return {
    result: {
      data: (data?.items || [])
        .filter((item) => item !== undefined)
        .map((item) => ({
          ...item,
          licenses: item.licenses ?? [],
          licenses_ref_mapping: item.licenses_ref_mapping ?? [],
          advisories: item.advisories ?? [],
        })),
      total: data?.total ?? 0,
      params,
    },
    isFetching: isLoading,
    fetchError: error as AxiosError,
    refetch,
  };
};

export const useFetchPackageById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [PackagesQueryKey, id],
    queryFn: () => getPurl({ client, path: { key: id } }),
  });

  return {
    pkg: data?.data,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};

export const useFetchPackagesBySbomId = (
  sbomId: string,
  params: HubRequestParams = {},
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PackagesQueryKey, "by-sbom", sbomId, params],
    queryFn: () =>
      listPackages({
        client,
        path: { id: sbomId },
        query: { ...requestParamsQuery(params) },
      }),
  });

  return {
    result: {
      data: data?.data?.items || [],
      total: data?.data?.total ?? 0,
      params,
    },
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};
