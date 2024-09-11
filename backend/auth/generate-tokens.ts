import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constsnts";

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
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}
