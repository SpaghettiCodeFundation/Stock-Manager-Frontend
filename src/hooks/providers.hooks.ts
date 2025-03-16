import {
  providers,
  deleteRecordsProviders,
  IQueryProviders,
} from "@/api/providers.api";

import { IApiResponseProviders } from "@/interfaces/providers.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProvidersQuery = (query: IQueryProviders) => {
  return useQuery<IApiResponseProviders, Error>({
    queryKey: ["providers", query],
    queryFn: async () => await providers(query),
  });
};

export const useDeleteRecordsProvidersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (providers: string[]) => await deleteRecordsProviders(providers),
    mutationKey: ["providers"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    },
  });
};
