import { create } from "zustand";

type AuthState = {
  isAuthorized: boolean;
  accessToken: string;
};

export type AuthAction = {
  setAuthorization: (
    isAuthorized: AuthState["isAuthorized"],
    accessToken: AuthState["accessToken"],
  ) => void;
};

export const useAuthorizationStore = create<AuthState & AuthAction>((set) => ({
  isAuthorized: false,
  accessToken: "",
  setAuthorization: (isAuthorized: boolean, accessToken: string) =>
    set({ isAuthorized, accessToken }),
}));
