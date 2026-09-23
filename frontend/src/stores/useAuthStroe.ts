import { create } from 'zustand';

export const useAuthStore = create<{ isCkechedAuth: boolean; setAuth: () => void }>((set) => ({
    isCkechedAuth: false,
    setAuth: () => set(() => ({ isCkechedAuth: true })),
}));
