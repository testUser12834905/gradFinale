import bcrypt from "bcrypt";
import express from "express";
import expressWs from "express-ws";
import { v4 as uuidv4 } from "uuid";
import type { User } from "./auth/generate-tokens";
import generateTokens from "./auth/generate-tokens";
import { issueNewAccessToken } from "./auth/verify-token";
import { Database } from "./database";
import openWebSocket from "./web-socket";
import cors from "cors";

export default function startServer() {
  const { app } = expressWs(express());
  app.use(express.json());

  if (process.env.NODE_ENV !== "production") {
    app.use(
      cors({
        origin: "http://localhost:5173",
      }),
    );
  }

  const database = new Database();

  const apiRouter = express.Router();

  apiRouter.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (await database.findUser(username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
    };

    database.createUser(newUser);
    res.status(201).json({ message: "User created successfully" });
  });

  apiRouter.get("/health", (req, res) => {
    res.json({ message: "I'm alive" });
  });

  apiRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await database.findUser(username);

    if (!user || !(await bcrypt.compare(password, user.dataValues.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const tokens = generateTokens(user.dataValues);
    res.json(tokens);
  });

  apiRouter.post("/refresh-token", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const accessToken = issueNewAccessToken(refreshToken);

    if (!accessToken) {
      res.sendStatus(401);
      return;
    }

    res.json({ accessToken });
  });

  openWebSocket(app, database);
  app.use("/api/v1", apiRouter);

  const PORT = 8080;

  (async () => {
    await database.initialize();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })();
}
