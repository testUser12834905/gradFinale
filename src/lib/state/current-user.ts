import { create } from "zustand";
import { purgeUserSession, retrieveUserSession } from "../local-storage/user";

export type CurrentUserState = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
  username: string;
  userID: string;
  isLoading: boolean;
};

type SetAuthorization = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
};

type SetUserInfo = {
  username: string;
  userID: string;
};

export type CurrentUserActions = {
  setAuthorization: ({
    isAuthorized,
    accessToken,
    refreshToken,
  }: SetAuthorization) => void;
  setUserInfo: ({ username, userID }: SetUserInfo) => void;
  initializeStore: () => Promise<void>;
  logout: () => Promise<void>;
};

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
  }: SetAuthorization) => set({ isAuthorized, accessToken, refreshToken }),
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
      console.error("Failed to initialize user session:", error);
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
