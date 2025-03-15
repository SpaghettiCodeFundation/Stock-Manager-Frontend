import {IFormStoreClient} from "@/components/clients/CreateClient";
import {IFormUpdateClient} from "@/components/clients/EditClient";
import api from "@/helpers/axios";
import {IApiResponseClients} from "@/interfaces/clients.interface";

export interface IQueryClients {
  limit?: number,
  page?: number,
  search?: string,
}

export const clients = async (query: IQueryClients  = {}): Promise<IApiResponseClients> => {
  const { limit = 5, page = 1, search = "" } = query;

  const response = await api.get('/clients', {
    params: { limit, page, search },
  }).catch(err => {
    console.error(err)
  });

  return response?.data as IApiResponseClients 
};

export const storeClient = async (data: IFormStoreClient) => {
  return await api.post(`/clients`, data)
};


export const updateClient = async (data: IFormUpdateClient, id: string) => {
  return await api.put(`/clients/${id}`, data)
};

export const deleteRecordsClients = async (clients: string[]) => {
  const response = await api.delete('/clients/delete-records', {
    data: {
      clients
    }
  }).catch(err => {
    console.error(err)
  });

  return response?.data
};
