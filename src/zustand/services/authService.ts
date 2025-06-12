import { ForgotPasswordReq, ForgotPasswordRes, LoginReq, LoginRes, LogoutRes, RegisterReq, RegisterRes } from "@/zustand/types/authT";
import { mainApi } from "@/utils/axios";
import { ApiSuccess } from "../types/apiT";

export const loginService = async (formData: LoginReq): Promise<ApiSuccess<LoginRes>> => {
    const { data } = await mainApi.post("/login", formData);
    if (!data.success) throw data;
    return data;
};

export const registerService = async (formData: RegisterReq): Promise<ApiSuccess<RegisterRes>> => {
    const { data } = await mainApi.post("/register", formData);
    if (!data.success) throw data;
    return data;
}

export const logoutService = async (): Promise<ApiSuccess<LogoutRes>> => {
    const { data } = await mainApi.delete("/logout");
    if (!data.success) throw data;
    return data;
};

export const forgotPasswordService = async (formData: ForgotPasswordReq): Promise<ApiSuccess<ForgotPasswordRes>> => {
    const { data } = await mainApi.post("/forgot-password", formData);
    if (!data.success) throw data;
    return data;
}