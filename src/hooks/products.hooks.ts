import {
    products,
    deleteRecordsProducts,
    IQueryProducts,
  } from "@/api/products.api";
  import { IApiResponseProducts } from "@/interfaces/products.interface";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
  
  export const useProductsQuery = (query: IQueryProducts) => {
    return useQuery<IApiResponseProducts, Error>({
      queryKey: ["products", query],
      queryFn: async () => await products(query),
    });
  };
  
  export const useDeleteRecordsProductsMutation = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (products: number[]) => await deleteRecordsProducts(products),
      mutationKey: ["products"],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  };
  