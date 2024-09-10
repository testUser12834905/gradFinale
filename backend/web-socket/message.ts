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
  let isSucces = false;

  const openConnection = openConections.get(connectionId);

  if (openConnection?.authorized) {
    isSucces = true;
    return isSucces;
  }

  if (message.type === "authorize") {
    // authenticate the token
    console.log("auth token from client", message.bearerToken);
    clearTimeout(timeoutId);

    isSucces = true;
    return isSucces;
  } else {
    openConnection?.connection.close();
    if (openConnection) {
      openConections.delete(connectionId);
    }
    isSucces = false;
    return isSucces;
  }
};
