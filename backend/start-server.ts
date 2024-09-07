import bcrypt from "bcrypt";
import express from "express";
import expressWs from "express-ws";
import { v4 as uuidv4 } from "uuid";
import authenticateToken from "./auth/authenticate-token";
import type { User } from "./auth/generate-tokens";
import generateTokens from "./auth/generate-tokens";
import { verifyRefreshToken } from "./auth/verify-token";
import { Database } from "./database";
import { handleWebSocketMessage } from "./websocket";

export default function startServer() {
  const { app, getWss } = expressWs(express());
  app.use(express.json());

  const users: User[] = [];

  // Global chat history
  const database = new Database();

  app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    res.status(201).json({ message: "User created successfully" });
  });

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  });

  app.post("/refresh-token", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    const accessToken = verifyRefreshToken(refreshToken);

    if (!accessToken) {
      return;
    }

    res.json({ accessToken });
  });

  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: res.locals.user });
  });

  app.ws("/", (ws, req) => {
    console.log("New client connected");

    // Send chat history to the new client
    ws.send(JSON.stringify(database.getFullChatHistory()));

    ws.on("message", (msg: string) => {
      console.log("Received:", msg.toString());
      const message = JSON.parse(msg);

      handleWebSocketMessage(message, database);

      // database.addToChatHistory(message);
      //
      // Broadcast to all clients
      const wss = getWss();

      // HACK: why does client have no type???
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(database.getFullChatHistory()));
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  const PORT = 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
