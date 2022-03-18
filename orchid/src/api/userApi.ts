import { ForgotValues } from "features/admin/user/pages/fogot-password/FogotPassword";
import { ListParams, ListResponse, User } from "models";
import { LoginPayload } from "./../features/auth/authSlice";
import axiosClient from "./axiosClient";

const userApi = {
  login(params: LoginPayload): Promise<ListResponse<User>> {
    const url = "/login";
    return axiosClient.post(url, params);
  },

  getAll(params: ListParams): Promise<ListResponse<User>> {
    const url = "/admin/users";
    return axiosClient.get(url, { params });
  },

  getById(id: string): Promise<User> {
    const url = `/admin/user/${id}`;
    return axiosClient.get(url);
  },

  getMe(): Promise<User> {
    const url = `/me`;
    return axiosClient.get(url);
  },

  add(data: FormData): Promise<User> {
    const url = "/register";
    return axiosClient.post(url, data);
  },

  update(data: Partial<User>): Promise<User> {
    const url = `/me/update`;
    return axiosClient.put(url, data);
  },

  remove(id: string): Promise<string> {
    const url = `/admin/user/${id}`;
    return axiosClient.delete(url);
  },

  logout(): Promise<string> {
    const url = `/logout`;
    return axiosClient.get(url);
  },

  forgotPassword(email: any): Promise<string> {
    const url = "/password/forgot";
    return axiosClient.post(url, { email });
  },

  resetPassword(
    token: string,
    data: ForgotValues
  ): Promise<ListResponse<User>> {
    const url = `/password/reset/${token}`;
    return axiosClient.put(url, data);
  },
};

export default userApi;
