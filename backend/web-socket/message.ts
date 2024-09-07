import type ws from "ws";
import { connections } from ".";
import type { WebSocketMessage } from "../../shared/types/ws-message";
import type { Database } from "../database";

export const handleWebSocketMessage = (
  message: WebSocketMessage,
  database: Database,
): void => {
  switch (message.type) {
    case "addChatMessage":
      database.addToChatHistory(message.data);
      return;
  }
};

export const authenticateConnection = (
  message: WebSocketMessage,
  targetConnection: ws.WebSocket,
  timeoutId: Timer,
): boolean => {
  const connection = Array.from(connections).find(
    (item) => item.connection === targetConnection,
  );

  if (connection?.authorized) {
    return true;
  }

  if (message.type === "authorize") {
    // authenticate the token
    clearTimeout(timeoutId);
    return true;
  } else {
    targetConnection.close();
    if (connection) {
      connections.delete(connection);
    }
    return false;
  }
};
