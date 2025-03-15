import {
  clients,
  deleteRecordsClients,
  IQueryClients,
} from "@/api/clients.api";

import { IApiResponseClients } from "@/interfaces/clients.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useClientsQuery = (query: IQueryClients) => {
  return useQuery<IApiResponseClients, Error>({
    queryKey: ["clients", query],
    queryFn: async () => await clients(query),
  });
};

export const useDeleteRecordsClientsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clients: string[]) => await deleteRecordsClients(clients),
    mutationKey: ["clients"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
