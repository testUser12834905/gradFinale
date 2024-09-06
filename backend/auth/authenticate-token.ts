import express from "express";
import { ACCESS_TOKEN_SECRET } from "./constsnts";
import type { TokenPayload } from "./generate-tokens";
import jwt from "jsonwebtoken";

// TODO: probably should be moved into a middle ware folder
export default function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user as TokenPayload;
    next();
  });
}
