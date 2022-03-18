import { Images } from "./product";

export interface ResetPasswordPayload {
  password: string;
  comfirmPassword: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
  role?: string;
  avatar?: Images;
  [key: string]: any;
}
