import express from "express";
import expressWs from "express-ws";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { handleWebSocketMessage } from "./websocket";
import { Database } from "./database";

interface User {
  id: string;
  username: string;
  password: string;
}

interface TokenPayload {
  userId: string;
  username: string;
}

export default function main() {
  const { app, getWss } = expressWs(express());
  app.use(express.json());

  // In-memory user store (replace with a database in production)
  const users: User[] = [];

  // Secret keys for JWT (use environment variables in production)
  const ACCESS_TOKEN_SECRET = "very_secure_access_token_secret";
  const REFRESH_TOKEN_SECRET = "very_secure_refresh_token_secret";

  // Global chat history
  const database = new Database();

  // Helper function to generate tokens
  function generateTokens(user: User): {
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

  // Middleware to validate access token
  function authenticateToken(
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

  // Register a new user
  app.post("/register", async (req, res) => {
    const { username, password } = req.body;

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

  // Login
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  });

  // Refresh token
  app.post("/refresh-token", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const userData = user as TokenPayload;
      const accessToken = jwt.sign(
        { userId: userData.userId, username: userData.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
      );

      res.json({ accessToken });
    });
  });

  // Protected route example
  app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
  });

  // WebSocket route
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
