import { v4 as uuidv4 } from "uuid";
import { openConections as openConnections } from ".";
import type { ChatMessage } from "../../shared/types/chat-message";
import type { WebSocketMessage } from "../../shared/types/ws-message";
import type { Database } from "../database/models";
import { verifyAccessToken } from "../auth/verify-token";

export const handleWebSocketMessage = async (
  message: WebSocketMessage,
  database: Database,
): Promise<void> => {
  switch (message.type) {
    case "addChatMessage":
      await database.addToChatHistory(message.data);
      return;
  }
};

export const authenticateConnection = (
  message: WebSocketMessage,
  connectionId: string,
  timeoutId: Timer,
): boolean => {
  const openConnection = openConnections.get(connectionId);

  if (openConnection?.authorized) {
    return true;
  }

  if (message.type === "authorize") {
    // authenticate the token
    const accessToken = message.bearerToken.split("Bearer ")[1];
    console.log(accessToken);
    const isVerified = verifyAccessToken(accessToken);

    if (isVerified) {
      openConnections.set(connectionId, {
        connection: openConnection!.connection,
        authorized: true,
      });

      console.log("auth token from client", message.bearerToken);
      clearTimeout(timeoutId);
    }
    return isVerified;
  } else {
    openConnection?.connection.close();
    if (openConnection) {
      openConnections.delete(connectionId);
    }
    return false;
  }
};
