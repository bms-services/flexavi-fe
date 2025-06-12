import { create } from "zustand";

type RegisterStore = {
    email: string | null;
    setEmail: (email: string) => void;
    clearEmail: () => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
    clearEmail: () => set({ email: null }),
}));