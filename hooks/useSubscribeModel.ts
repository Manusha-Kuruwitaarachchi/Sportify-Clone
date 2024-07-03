import { create } from "zustand";

interface SubscribeModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useSubscribeModel = create<SubscribeModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModel;
