import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "./constants";

export type TokenPayload = {
  userID: string;
  username: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
};

export default function generateTokens<T extends User>(
  user: T,
): {
  accessToken: string;
  refreshToken: string;
} {
  const payload: TokenPayload = { userID: user.id, username: user.username };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
}
