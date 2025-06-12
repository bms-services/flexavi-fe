import { useMutation } from "@tanstack/react-query";
import { forgotPasswordService, loginService, logoutService, registerService } from "@/zustand/services/authService";
import { useAuthStore } from "@/stores/useAuthStore";
import { ForgotPasswordReq, ForgotPasswordRes, LoginReq, LoginRes, LogoutRes, RegisterReq, RegisterRes } from "@/zustand/types/authT";
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