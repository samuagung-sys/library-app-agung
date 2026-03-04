import { axiosInstance } from "@/lib/axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
};

export async function login(
  payload: LoginPayload
): Promise<LoginResponse> {
  const res = await axiosInstance.post("/auth/login", payload);
  return res.data;
}