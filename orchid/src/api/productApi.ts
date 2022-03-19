import { Category, ListParams, ListResponse, Product } from "models";
import axiosClient from "./axiosClient";

const productApi = {
  getAll(params: ListParams): Promise<ListResponse<Product>> {
    const url = "/products";
    return axiosClient.get(url, { params });
  },

  getAllCategory(): Promise<ListResponse<Category>> {
    const url = "/category";
    return axiosClient.get(url);
  },

  getById(id: string): Promise<ListResponse<Product>> {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<Product> {
    const url = "/admin/product/new";
    return axiosClient.post(url, data);
  },

  update(id: string, data: FormData): Promise<Product> {
    const url = `/admin/product/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<string> {
    const url = `/admin/product/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
