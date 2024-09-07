import type expressWs from "express-ws";
import { authenticateConnection, handleWebSocketMessage } from "./message";
import type { Database } from "../database";
import type ws from "ws";
import broadcastMessage from "./broadcast";
import { sendInitialState } from "./send";

type ConnectionItem = {
  connection: ws.WebSocket;
  authorized: boolean;
};

export const connections: Set<ConnectionItem> = new Set();

export default function openWebSocket(
  app: expressWs.Application,
  database: Database,
) {
  app.ws("/", (connection, req) => {
    const connectionItem = { connection, authorized: false };

    const timeoutId = setTimeout(() => {
      // delete connection
    }, 10000); // 10 seconds

    connections.add(connectionItem);
    sendInitialState(connection, database);

    connection.on("message", (msg: string) => {
      const message = JSON.parse(msg);

      const authorized = authenticateConnection(message, connection, timeoutId);
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
