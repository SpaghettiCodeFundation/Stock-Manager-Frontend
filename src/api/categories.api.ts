import api from "@/helpers/axios";
import {IApiResponseCategories} from "@/interfaces/categories.interface";

export interface IQueryCategories {
  limit?: number,
  page?: number,
  search?: string,
}

export const categories = async (query: IQueryCategories  = {}): Promise<IApiResponseCategories> => {
 const { limit = 5, page = 1, search = "" } = query;

  const response = await api.get('/categories', {
    params: { limit, page, search },
  }).catch(err => {
    console.error(err)
  });

  return response?.data as IApiResponseCategories
};

export const deleteRecordsCategories = async (categories: number[]) => {

  console.log(categories)
  const response = await api.delete('/categories/delete-records', {
    data: {
      categories
    }
  }).catch(err => {
    console.error(err)
  });

  return response?.data
};
