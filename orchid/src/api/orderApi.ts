import { ListParams, ListResponse, Product } from "models";
import { Order } from "models/order";
import axiosClient from "./axiosClient";

const orderApi = {
  getAll(): Promise<ListResponse<Order>> {
    const url = "/admin/orders/";
    return axiosClient.get(url);
  },

  getById(id: string): Promise<Order> {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<Order> {
    const url = "/order/new";
    return axiosClient.post(url, data);
  },

  updateStatus(id: string, status: any): Promise<string> {
    const url = `/admin/order/${id}`;
    return axiosClient.put(url, { status });
  },

  remove(id: string): Promise<string> {
    const url = `/admin/order/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
