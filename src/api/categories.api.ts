import {IFormStoreCategory} from "@/components/categories/CraeteCategory";
import {IFormUpdateCategory} from "@/components/categories/EditCategory";
import api from "@/helpers/axios";
import {IApiResponseCategories, ICategory} from "@/interfaces/categories.interface";

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

export const storeCategory = async (data: IFormStoreCategory) => {

  return await api.post(`/categories`, data)
};


export const updateCategory = async (data: IFormUpdateCategory, id: string) => {

  const response = await api.put(`/categories/${id}`, data).catch(err => {
    console.error(err)
  });

  return response?.data
};

export const deleteRecordsCategories = async (categories: string[]) => {

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
