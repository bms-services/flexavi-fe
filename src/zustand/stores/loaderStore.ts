import { create } from 'zustand';

type LoaderStore = {
    show: boolean;
    message?: string;
    setLoader: (show: boolean, message?: string) => void;
};

export const useGlobalStore = create<LoaderStore>((set) => ({
    show: false,
    message: undefined,
    setLoader: (show, message) => set({ show, message }),
}));