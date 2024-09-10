import { create } from "zustand";

type AuthState = {
  isAuthorized: boolean;
};

export type AuthAction = {
  setIsAuthorized: (isAuthorized: AuthState["isAuthorized"]) => void;
};

export const useAuthorizationStore = create<AuthState & AuthAction>((set) => ({
  isAuthorized: false,
  setIsAuthorized: (isAuthorized) => set({ isAuthorized }),
}));
