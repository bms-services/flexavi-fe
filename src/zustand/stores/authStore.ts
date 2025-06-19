import { create } from "zustand";

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