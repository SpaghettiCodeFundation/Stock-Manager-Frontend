
export interface IProvider {
  id: string;
  name: string;
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
};

export interface IMeta {
  total_page: number;
  current_page: number;
  last_page: number;
}

export interface IApiResponseProviders {
  providers: IProvider[];
  meta: IMeta;
}
