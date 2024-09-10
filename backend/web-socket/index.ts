import type expressWs from "express-ws";
import { v4 as uuidv4 } from "uuid";
import type ws from "ws";
import { SECOND } from "../../shared/consts/measurement";
import type { Database } from "../database";
import broadcastMessage from "./broadcast";
import { authenticateConnection, handleWebSocketMessage } from "./message";
import { sendInitialState } from "./send";

type ConnectionItem = {
  connection: ws.WebSocket;
  authorized: boolean;
};

export const openConections: Map<string, ConnectionItem> = new Map();

export default function openWebSocket(
  app: expressWs.Application,
  database: Database,
) {
  app.ws("/api", (connection, req) => {
    const connectionItem = { connection, authorized: false };
    const connectionId = uuidv4();

    const timeoutId = setTimeout(() => {
      const openConnection = openConections.get(connectionId);

      if (openConnection?.authorized) {
        return;
      }

      openConnection?.connection.close();
      openConections.delete(connectionId);
    }, 10 * SECOND);

    openConections.set(connectionId, connectionItem);
    sendInitialState(connection, database);

    connection.on("message", (msg: string) => {
      const message = JSON.parse(msg);

      const authorized = authenticateConnection(
        message,
        connectionId,
        timeoutId,
      );
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
