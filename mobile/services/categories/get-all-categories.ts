import apiClient from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Category } from '@/types/api-types';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCategories = async (): Promise<{ data: Category[] } | null> => {
  const response = await apiClient.get('/categories');
  return response.data;
};

export const getCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
};

type UseCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCategoriesQueryOptions>;
};

export const useCategories = ({ queryConfig }: UseCategoriesOptions = {}) => {
  return useQuery({
    ...getCategoriesQueryOptions(),
    ...queryConfig,
  });
};
