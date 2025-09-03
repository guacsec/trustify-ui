import { isMockDisabled } from "@app/Constants";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

const defaultTimeout = 1000;

export const mockPromise = <TQueryFnData>(
  data: TQueryFnData,
  timeout = defaultTimeout,
  success = true,
) => {
  return new Promise<TQueryFnData>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(new Error("Error"));
      }
    }, timeout);
  });
};

export const useMockableQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  params: UseQueryOptions<TQueryFnData, TError, TData>,
  mockData: TQueryFnData,
) => {
  return useQuery<TQueryFnData, TError, TData>({
    ...params,
    queryFn: isMockDisabled ? params.queryFn : () => mockPromise(mockData),
  });
};
