import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "./constants";
import type { TokenPayload } from "./generate-tokens";

export const verifyRefreshToken = (refreshToken: string): string | null => {
  let newAccessToken: string | null = null;

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      newAccessToken = null;
    }

    const userData = user as TokenPayload;
    const accessToken = jwt.sign(
      { userID: userData.userID, username: userData.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
    );

    newAccessToken = accessToken;
  });

  return newAccessToken;
};

export const verifyAccessToken = (accessToken: string) => {
  let verified: boolean = false;

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      verified = false;
    } else {
      verified = true;
    }
  });

  return verified;
};
