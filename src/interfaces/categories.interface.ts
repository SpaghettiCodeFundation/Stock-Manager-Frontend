
export interface ICategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export interface ICategories {
  categories: ICategory[];
};

export interface IMeta {
  total_page: number;
  current_page: number;
  last_page: number;
}

export interface IApiResponseCategories {
  categories: ICategory[];
  meta: IMeta;
}
