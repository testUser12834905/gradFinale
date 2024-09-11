export type CurrentUserState = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
  username: string;
  userID: string;
  isLoading: boolean;
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

export type SetAuthorization = {
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
};

export type SetUserInfo = {
  username: string;
  userID: string;
};
