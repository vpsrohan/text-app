import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser,
  isLoggedIn: false,
  login: () => {
    set({ isLoggedIn: true });
  },
}));
