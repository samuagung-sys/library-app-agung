import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "@/services/auth.service";
import { loginSuccess } from "@/store/slices/authSlice";
import { setAccessToken } from "@/store/authStorage";

type LoginPayload = {
  email: string;
  password: string;
};

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),

    onSuccess: (res) => {
      const token = res.data?.token;

      if (!token) {
        console.error("Token not found:", res);
        return;
      }

      setAccessToken(token);
      dispatch(loginSuccess());
      navigate("/dashboard");
    },
  });
}