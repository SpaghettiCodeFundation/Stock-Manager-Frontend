
export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export interface IMeta {
  total_page: number;
  current_page: number;
  last_page: number;
}

export interface IApiResponseClients {
  clients: IClient[];
  meta: IMeta;
}
