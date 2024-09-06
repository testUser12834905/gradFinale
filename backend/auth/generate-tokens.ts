import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constsnts";

export type TokenPayload = {
  userId: string;
  username: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
};

export default function generateTokens(user: User): {
  accessToken: string;
  refreshToken: string;
} {
  const payload: TokenPayload = { userId: user.id, username: user.username };
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}
