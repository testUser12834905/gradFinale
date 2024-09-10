import { openConections as openConnections } from ".";
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

  console.log("connectionId", connectionId);
  const openConnection = openConnections.get(connectionId);
  // console.log(openConnections);
  // console.log(openConnection);

  if (openConnection?.authorized) {
    isSucces = true;
    return isSucces;
  }

  if (message.type === "authorize") {
    // authenticate the token

    openConnections.set(connectionId, {
      connection: openConnection!.connection,
      authorized: true,
    });

    console.log("auth token from client", message.bearerToken);
    clearTimeout(timeoutId);

    isSucces = true;
    return isSucces;
  } else {
    openConnection?.connection.close();
    if (openConnection) {
      openConnections.delete(connectionId);
    }
    isSucces = false;
    return isSucces;
  }
};
