import { create } from "zustand";
import Cookies from "js-cookie";
import { ApiSuccess } from "@/zustand/types/apiT";
import { LoginRes } from "@/zustand/types/authT";

const tokenName = import.meta.env.VITE_TOKEN_NAME;

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    login: (res: ApiSuccess<LoginRes>) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    token: Cookies.get(tokenName) || null,
    isAuthenticated: !!Cookies.get(tokenName),
    login: (res: ApiSuccess<LoginRes>) => {
        const result = res.result;
        Cookies.set(tokenName, result.token);
        set({ token: result.token, isAuthenticated: true });

        if (result.has_main_company) {
            return window.location.href = "/";
        } else {
            return window.location.href = "/create-company";
        }
    },
    logout: () => {
        Cookies.remove(tokenName);
        set({ token: null, isAuthenticated: false });
        window.location.href = "/login";
    },
}));