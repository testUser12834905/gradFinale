import { create } from "zustand";
import {
  persistUserSession,
  purgeUserSession,
  retrieveUserSession,
} from "../../local-storage/user";
import type {
  CurrentUserActions,
  CurrentUserState,
  SetAuthorization,
  SetUserInfo,
} from "./types";

export const useCurrentUserStore = create<
  CurrentUserState & CurrentUserActions
>((set) => ({
  isAuthorized: false,
  accessToken: "",
  refreshToken: "",
  username: "",
  userID: "",
  isLoading: true,
  setAuthorization: ({
    isAuthorized,
    accessToken,
    refreshToken,
  }: SetAuthorization) => {
    persistUserSession({
      accessToken,
      refreshToken,
    });

    set({ isAuthorized, accessToken, refreshToken });
  },
  setUserInfo: ({ username, userID }: SetUserInfo) => set({ username, userID }),
  initializeStore: async () => {
    try {
      const session = await retrieveUserSession();
      set({
        isAuthorized: session.isAuthorized,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        username: session.username,
        userID: session.userID,
        isLoading: false,
      });
    } catch (error) {
      set({ isAuthorized: false, isLoading: false });
    }
  },
  logout: async () => {
    await purgeUserSession();
    set({
      username: "",
      userID: "",
      isAuthorized: false,
      accessToken: "",
      refreshToken: "",
    });
  },
}));
