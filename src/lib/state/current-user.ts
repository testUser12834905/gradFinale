import { create } from "zustand";

type CurrentUserState = {
  isAuthorized: boolean;
  accessToken: string;
  username: string;
  userID: string;
};

type SetAuthorization = {
  isAuthorized: boolean;
  accessToken: string;
};

type SetUserInfo = {
  username: string;
  userID: string;
};

export type CurrentUserActions = {
  setAuthorization: ({ isAuthorized, accessToken }: SetAuthorization) => void;
  setUserInfo: ({ username, userID }: SetUserInfo) => void;
};

export const useCurrentUserStore = create<
  CurrentUserState & CurrentUserActions
>((set) => ({
  isAuthorized: false,
  accessToken: "",
  username: "",
  userID: "",
  setAuthorization: ({ isAuthorized, accessToken }: SetAuthorization) =>
    set({ isAuthorized, accessToken }),
  setUserInfo: ({ username, userID }: SetUserInfo) => set({ username, userID }),
}));
