import type expressWs from "express-ws";
import { v4 as uuidv4 } from "uuid";
import type ws from "ws";
import { SECOND } from "../../shared/consts/measurement";
import type { Database } from "../database";
import broadcastDBState, { requestRevalidation } from "./broadcast";
import { authenticateConnection, handleWebSocketMessage } from "./message";
import { sendInitialState } from "./send";
import { disconnetTimeout, setRevalidateInterval } from "./auth";

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

    const timeoutId = disconnetTimeout(connectionId);
    openConections.set(connectionId, connectionItem);
    sendInitialState(connection, database);

    connection.on("message", async (msg: string) => {
      const message = JSON.parse(msg);

      const authorized = authenticateConnection(
        message,
        connectionId,
        timeoutId,
      );
      if (!authorized) {
        return;
      }

      await handleWebSocketMessage(message, database);
      broadcastDBState(database);
    });

    connection.on("close", () => {
      console.log("Client disconnected");
    });

    setRevalidateInterval();
  });
}
