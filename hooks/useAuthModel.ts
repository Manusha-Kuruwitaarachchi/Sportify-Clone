import {create } from "zustand";

interface AuthModelStore{
    isOpen: boolean;
    onOpen: () =>void;
    onClose: () =>void;
};

const useAuthModel = create<AuthModelStore>((set) =>({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
export default useAuthModel;