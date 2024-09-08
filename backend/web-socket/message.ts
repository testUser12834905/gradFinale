import type ws from "ws";
import { openConections } from ".";
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
  connectionId: string,
  timeoutId: Timer,
): boolean => {
  const openConnection = openConections.get(connectionId);

  if (openConnection?.authorized) {
    return true;
  }

  if (message.type === "authorize") {
    // authenticate the token
    clearTimeout(timeoutId);
    return true;
  } else {
    openConnection?.connection.close();
    if (openConnection) {
      openConections.delete(connectionId);
    }
    return false;
  }
};
