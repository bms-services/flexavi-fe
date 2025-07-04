import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPasswordService, loginService, logoutService, registerService, registerEmployeeService, verifyRegisterEmployeeService, resetPasswordService, verifyResetPasswordService } from "@/zustand/services/authService";
import { ForgotPasswordReq, ForgotPasswordRes, LoginReq, LoginRes, LogoutRes, RegisterEmployeeReq, RegisterEmployeeRes, RegisterReq, RegisterRes, ResetPasswordReq, ResetPasswordRes, VerifyRegisterEmployeeRes, VerifyResetPasswordReq, VerifyResetPasswordRes } from "@/zustand/types/authT";
import { ApiError, ApiSuccess } from "@/zustand/types/apiT";
import { useAuthStore, useRegisterStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { mapApiErrorsToForm } from "@/utils/mapApiErrorsToForm";
import { useEffect } from "react";

export const useLogin = () => {
    const { setLogin } = useAuthStore();

    return useMutation<ApiSuccess<LoginRes>, ApiError, LoginReq>({
        mutationFn: loginService,
        onSuccess: (res) => {
            setLogin(res);
        },
    });
};

export const useRegister = (methods: UseFormReturn<RegisterReq, ApiError, RegisterReq>) => {
    const navigate = useNavigate();
    const { setEmail } = useRegisterStore();

    return useMutation<ApiSuccess<RegisterRes>, ApiError, RegisterReq>({
        mutationFn: registerService,
        onSuccess: (res) => {
            setEmail(res.result.email);
            navigate("/register/success",);
        },
        onError: (error) => {
            mapApiErrorsToForm(error.errors, methods.setError);
        }
    });
};

export const useRegisterEmployee = (methods: UseFormReturn<RegisterEmployeeReq, ApiError, RegisterEmployeeReq>
) => {
    const navigate = useNavigate();
    const { setEmail } = useRegisterStore();

    return useMutation<ApiSuccess<RegisterEmployeeRes>, ApiError, RegisterEmployeeReq>({
        mutationFn: registerEmployeeService,
        onSuccess: (res) => {
            setEmail(res.result.email);
            navigate("/register/success");
        },
        onError: (error) => {
            mapApiErrorsToForm(error.errors, methods.setError);
        }
    });
};

export const useVerifyRegisterEmployee = (token: string, methods: UseFormReturn<RegisterEmployeeReq, ApiError, RegisterEmployeeReq>) => {
    const navigate = useNavigate();
    const query = useQuery<ApiSuccess<VerifyRegisterEmployeeRes>, ApiError>({
        queryKey: ['verify-register-employee', token],
        queryFn: () => verifyRegisterEmployeeService(token),
        enabled: (token) => !!token,
        retry: false,
    });

    useEffect(() => {
        if (query.isSuccess && query.data) {
            const { name, email, phone } = query.data.result;
            methods.setValue("name", name);
            methods.setValue("email", email);
            methods.setValue("phone", phone);
        }

        if (query.isError) {
            navigate("/login");
        }
    }, [query.isSuccess, query.isError, query.data, methods, navigate]);
    return query;
};

export const useLogout = () => {
    const { setLogout } = useAuthStore();

    return useMutation<ApiSuccess<LogoutRes>, ApiError>({
        mutationFn: logoutService,
        onSuccess: () => {
            setLogout();
        },
        onError: () => {
            setLogout();
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