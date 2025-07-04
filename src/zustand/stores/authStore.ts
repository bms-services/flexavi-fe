import { create } from "zustand";
import { ApiSuccess } from "../types/apiT";
import { LoginRes } from "../types/authT";
import Cookies from "js-cookie";

type AuthStore = {
    token: string | null;
    isAuthenticated: boolean;
    setLogin: (res: ApiSuccess<LoginRes>) => void;
    setLogout: () => void;
};

type RegisterStore = {
    email: string | null;
    setEmail: (email: string) => void;
    clearEmail: () => void;
};


type ForgotPasswordStore = {
    email: string | null;
    setEmail: (email: string) => void;
    clearEmail: () => void;
}

type ResetPasswordStore = {
    email: string | null;
    setEmail: (email: string) => void;
    clearEmail: () => void;
}


const tokenName = import.meta.env.VITE_TOKEN_NAME;

export const useAuthStore = create<AuthStore>((set) => ({
    token: Cookies.get(tokenName) || null,
    isAuthenticated: !!Cookies.get(tokenName),
    setLogin: (res: ApiSuccess<LoginRes>) => {
        const result = res.result;
        Cookies.set(tokenName, result.token);
        set({ token: result.token, isAuthenticated: true });

        if (result.has_main_company) {
            window.location.href = "/";
        } else {
            window.location.href = "/create-company";
        }
    },
    setLogout: () => {
        Cookies.remove(tokenName);
        set({ token: null, isAuthenticated: false });
        window.location.href = "/login";
    },
}));

export const useRegisterStore = create<RegisterStore>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: null }),
}));

export const useForgotPasswordStore = create<ForgotPasswordStore>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: null }),
}));

export const useResetPasswordStore = create<ResetPasswordStore>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: null }),
}));