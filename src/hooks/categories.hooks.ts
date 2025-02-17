import {
  categories,
  deleteRecordsCategories,
  IQueryCategories,
} from "@/api/categories.api";
import { IApiResponseCategories } from "@/interfaces/categories.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useCategoriesQuery = (query: IQueryCategories) => {
  return useQuery<IApiResponseCategories, Error>({
    queryKey: ["categories", query],
    queryFn: async () => await categories(query),
  });
};

export const useDeleteRecordsCategoriesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categories: number[]) => await deleteRecordsCategories(categories),
    mutationKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
