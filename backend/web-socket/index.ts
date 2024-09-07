import type expressWs from "express-ws";
import { authenticateConnection, handleWebSocketMessage } from "./message";
import type { Database } from "../database";
import type ws from "ws";
import broadcastMessage from "./broadcast";

export const connections: Set<{
  connection: ws.WebSocket;
  authorized: boolean;
}> = new Set();

export default function openWebSocket(
  app: expressWs.Application,
  database: Database,
) {
  app.ws("/", (connection, req) => {
    connections.add({ connection, authorized: false });

    connection.send(JSON.stringify(database.getFullChatHistory()));

    connection.on("message", (msg: string) => {
      const message = JSON.parse(msg);

      const authorized = authenticateConnection(message, connection);
      if (!authorized) {
        return;
      }

      handleWebSocketMessage(message, database);

      broadcastMessage(database);
    });

    connection.on("close", () => {
      console.log("Client disconnected");
    });
  });
}
