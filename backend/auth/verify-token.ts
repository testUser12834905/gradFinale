import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constsnts";
import type { TokenPayload } from "./generate-tokens";

export const verifyRefreshToken = (refreshToken: string): string | null => {
  let refTok: string | null = null;

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      refTok = null;
    }

    const userData = user as TokenPayload;
    const accessToken = jwt.sign(
      { userID: userData.userID, username: userData.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    refTok = accessToken;
  });

  return refTok;
};

export const verifyAccessToken = () => {
  return;
};
