'use client';

import {
  keepPreviousData,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from '@tanstack/react-query';

export type AppQueryOptions<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'> & {
  queryKey: TQueryKey;
  queryFn: () => Promise<TQueryFnData>;
  /** Human readable description to surface in logs/toasts */
  errorMessage?: string;
};

export function useAppQuery<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryFn,
  queryKey,
  errorMessage = 'Unable to load data',
  meta,
  ...rest
}: AppQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const wrappedQueryFn = async () => {
    try {
      return await queryFn();
    } catch (error) {
      console.error(errorMessage, error);
      throw error;
    }
  };

  return useQuery({
    queryKey,
    queryFn: wrappedQueryFn,
    placeholderData: keepPreviousData,
    ...rest,
    meta: { ...(meta ?? {}), errorMessage },
  });
}
