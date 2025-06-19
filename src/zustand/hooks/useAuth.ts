import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPasswordService, loginService, logoutService, registerService, registerEmployeeService, verifyRegisterEmployeeService, resetPasswordService, verifyResetPasswordService } from "@/zustand/services/authService";
import { useAuthStore } from "@/stores/useAuthStore";
import { ForgotPasswordReq, ForgotPasswordRes, LoginReq, LoginRes, LogoutRes, RegisterEmployeeReq, RegisterEmployeeRes, RegisterReq, RegisterRes, ResetPasswordReq, ResetPasswordRes, VerifyRegisterEmployeeRes, VerifyRegisterEmployeeReq, VerifyResetPasswordReq, VerifyResetPasswordRes } from "@/zustand/types/authT";
import { ApiError, ApiSuccess } from "@/zustand/types/apiT";

export const useLogin = () => {
    const login = useAuthStore((s) => s.login);
    return useMutation<ApiSuccess<LoginRes>, ApiError, LoginReq>({
        mutationFn: loginService,
        onSuccess: (res) => {
            login(res);
        },
    });
};

export const useRegister = () => {
    return useMutation<ApiSuccess<RegisterRes>, ApiError, RegisterReq>({
        mutationFn: registerService,
    });
};

export const useRegisterEmployee = () => {
    return useMutation<ApiSuccess<RegisterEmployeeRes>, ApiError, RegisterEmployeeReq>({
        mutationFn: registerEmployeeService,
    });
};

export const useVerifyRegisterEmployee = (token: string) => {
    return useQuery<ApiSuccess<VerifyRegisterEmployeeRes>, ApiError>({
        queryKey: ['verify-register-employee', token],
        queryFn: () => verifyRegisterEmployeeService(token),
        enabled: (token) => !!token,
        retry: false,
    });
};

export const useLogout = () => {
    const logout = useAuthStore((s) => s.logout);
    return useMutation<ApiSuccess<LogoutRes>, ApiError>({
        mutationFn: logoutService,
        onSuccess: () => {
            logout();
        },
        onError: (error) => {
            logout();
        }
    });
};

export const useForgotPassword = () => {
    return useMutation<ApiSuccess<ForgotPasswordRes>, ApiError, ForgotPasswordReq>({
        mutationFn: forgotPasswordService,
    });
}

export const useResetPassword = () => {
    return useMutation<ApiSuccess<ResetPasswordRes>, ApiError, ResetPasswordReq>({
        mutationFn: resetPasswordService,
    });
}

export const useVerifyResetPassword = (params: VerifyResetPasswordReq) => {
    return useQuery<ApiSuccess<VerifyResetPasswordRes>, ApiError>({
        queryKey: ['verify-reset-password', params],
        queryFn: () => verifyResetPasswordService(params),
        enabled: (token) => !!token,
        retry: false,
    });
};