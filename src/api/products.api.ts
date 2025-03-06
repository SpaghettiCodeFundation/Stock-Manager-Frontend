import api from "@/helpers/axios";
import { IApiResponseProducts } from "@/interfaces/products.interface";

export interface IQueryProducts {
  limit?: number,
  page?: number,
  search?: string,
}

export const products = async (query: IQueryProducts = {}): Promise<IApiResponseProducts> => {
  const { limit = 5, page = 1, search = "" } = query;

  const response = await api.get('/products', {
    params: { limit, page, search },
  }).catch(err => {
    console.error(err);
  });

  return response?.data as IApiResponseProducts;
};

export const deleteRecordsProducts = async (products: number[]) => {

  console.log(products);
  const response = await api.delete('/products/delete-records', {
    data: {
      products,
    },
  }).catch(err => {
    console.error(err);
  });

  return response?.data;
};
