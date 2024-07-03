import {create } from "zustand";

interface UploadModelStore{
    isOpen: boolean;
    onOpen: () =>void;
    onClose: () =>void;
};

const useAuthModel = create<UploadModelStore>((set) =>({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
export default useAuthModel;