import { ForgotPasswordReq, ForgotPasswordRes, LoginReq, LoginRes, LogoutRes, RegisterEmployeeReq, RegisterEmployeeRes, RegisterReq, RegisterRes, ResetPasswordReq, ResetPasswordRes, VerifyRegisterEmployeeRes, VerifyRegisterEmployeeReq, VerifyResetPasswordReq, VerifyResetPasswordRes } from "@/zustand/types/authT";
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

export const registerEmployeeService = async (formData: RegisterEmployeeReq): Promise<ApiSuccess<RegisterEmployeeRes>> => {
    const { data } = await mainApi.post("/register/employee", formData);
    if (!data.success) throw data;
    return data;
};

export const verifyRegisterEmployeeService = async (token: string): Promise<ApiSuccess<VerifyRegisterEmployeeRes>> => {
    const { data } = await mainApi.get("/register/employee", { params: { token } });
    if (!data.success) throw data;
    return data;
};

export const logoutService = async (): Promise<ApiSuccess<LogoutRes>> => {
    const { data } = await mainApi.delete("/logout");
    if (!data.success) throw data;
    return data;
};

export const forgotPasswordService = async (formData: ForgotPasswordReq): Promise<ApiSuccess<ForgotPasswordRes>> => {
    const { data } = await mainApi.post("/forgot-password", formData);
    if (!data.success) throw data;
    return data;
};

export const resetPasswordService = async (formData: ResetPasswordReq): Promise<ApiSuccess<ResetPasswordRes>> => {
    const { data } = await mainApi.post("/reset-password", formData);
    if (!data.success) throw data;
    return data;
};


export const verifyResetPasswordService = async (params: VerifyResetPasswordReq): Promise<ApiSuccess<VerifyResetPasswordRes>> => {
    const { data } = await mainApi.get("/reset-password", { params });
    if (!data.success) throw data;
    return data;
};
