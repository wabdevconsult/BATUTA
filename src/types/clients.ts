export interface Client {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewClient {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}