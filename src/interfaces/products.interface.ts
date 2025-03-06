export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IProducts {
    products: IProduct[];
  }
  
  export interface IMeta {
    total_page: number;
    current_page: number;
    last_page: number;
  }
  
  export interface IApiResponseProducts {
    products: IProduct[];
    meta: IMeta;
  }
  