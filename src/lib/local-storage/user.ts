import { del, get, set } from "idb-keyval";
import { jwtDecode } from "jwt-decode";
import type { CurrentUserState } from "../state/current-user";

type UserSession = {
  accessToken: string;
  refreshToken: string;
};

export const persistUserSession = async (userSession: UserSession) => {
  console.log("persist", userSession);
  await set("user-session", userSession);
};

export const retrieveUserSession = async (): Promise<CurrentUserState> => {
  const now = Date.now() / 1000;
  const userSession = await get("user-session");
  const currentUserState: CurrentUserState = {
    isAuthorized: false,
    accessToken: "",
    refreshToken: "",
    username: "",
    userID: "",
    isLoading: false,
  };

  if (!userSession) return currentUserState;

  const decryptedRefreshToken = jwtDecode(userSession.refreshToken);

  if (now > decryptedRefreshToken.exp!) {
    await del("user-session");
    return currentUserState;
  }

  const decryptedAccessToken = jwtDecode(userSession.accessToken);
  if (now > decryptedAccessToken.exp!) {
    // get new access token
  }

  const { userID, username } = decryptedAccessToken as Partial<{
    userID: string;
    username: string;
  }>;

  currentUserState.isAuthorized = true;
  currentUserState.accessToken = userSession.accessToken;
  currentUserState.refreshToken = userSession.refreshToken;
  currentUserState.username = username || "";
  currentUserState.userID = userID || "";

  console.log("here4", currentUserState);
  return currentUserState;
};

export const purgeUserSession = async () => {
  await del("user-session");
};
