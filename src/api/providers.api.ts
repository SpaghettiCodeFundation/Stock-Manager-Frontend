import {IFormUpdateCategory} from "@/components/categories/EditCategory";
import {IFormStoreProvider} from "@/components/providers/CraeteProvider";
import api from "@/helpers/axios";
import {IApiResponseProviders} from "@/interfaces/providers.interface";

export interface IQueryProviders {
  limit?: number,
  page?: number,
  search?: string,
}

export const providers = async (query: IQueryProviders  = {}): Promise<IApiResponseProviders> => {
 const { limit = 5, page = 1, search = "" } = query;

  const response = await api.get('/providers', {
    params: { limit, page, search },
  }).catch(err => {
    console.error(err)
  });

  return response?.data as IApiResponseProviders
};

export const storeProvider = async (data: IFormStoreProvider) => {
  return await api.post(`/providers`, data)
};

export const updateProvider = async (data: IFormUpdateCategory, id: string) => {
  const response = await api.put(`/providers/${id}`, data).catch(err => {
    console.error(err)
  });

  return response?.data
};

export const deleteRecordsProviders = async (providers: string[]) => {
  const response = await api.delete('/providers/delete-records', {
    data: {
      providers 
    }
  }).catch(err => {
    console.error(err)
  });

  return response?.data
};
