import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { HubRequestParams, SBOM } from "@app/api/models";
import {
  getSBOMById,
  getSBOMSourceById,
  getSBOMs,
  getSBOMsByPackageId,
  uploadSbom,
} from "@app/api/rest";
import { useUpload } from "@app/hooks/useUpload";

export const SBOMsQueryKey = "sboms";

export const useFetchSBOMs = (
  params: HubRequestParams = {},
  refetchDisabled: boolean = false
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMsQueryKey, params],
    queryFn: () => getSBOMs(params),
    refetchInterval: !refetchDisabled ? 5000 : false,
  });
  return {
    result: {
      data: data?.data || [],
      total: data?.total ?? 0,
      params: data?.params ?? params,
    },
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};

export const useFetchSBOMById = (id?: number | string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [SBOMsQueryKey, id],
    queryFn: () =>
      id === undefined ? Promise.resolve(undefined) : getSBOMById(id),
    enabled: id !== undefined,
  });

  return {
    sbom: data,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};

export const useFetchSBOMSourceById = (id?: number | string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [SBOMsQueryKey, id, "source"],
    queryFn: () =>
      id === undefined ? Promise.resolve(undefined) : getSBOMSourceById(id),
    enabled: id !== undefined,
  });

  return {
    source: data,
    isFetching: isLoading,
    fetchError: error as AxiosError,
  };
};

export const useUploadSBOM = () => {
  const queryClient = useQueryClient();
  return useUpload<SBOM, { message: string }>({
    parallel: true,
    uploadFn: (formData, config) => {
      return uploadSbom(formData, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SBOMsQueryKey],
      });
    },
  });
};

export const useFetchSbomsByPackageId = (
  packageId: string,
  params: HubRequestParams = {}
) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [SBOMsQueryKey, "by-package", packageId, params],
    queryFn: () => getSBOMsByPackageId(packageId, params),
  });
  return {
    result: {
      data: data?.data || [],
      total: data?.total ?? 0,
      params: data?.params ?? params,
    },
    isFetching: isLoading,
    fetchError: error,
    refetch,
  };
};
