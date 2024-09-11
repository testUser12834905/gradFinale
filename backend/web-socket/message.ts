import { openConections as openConnections } from ".";
import type { WebSocketMessage } from "../../shared/types/ws-message";
import { verifyAccessToken } from "../auth/verify-token";
import type { Database } from "../database/models";

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
    console.log("auth");

    const accessToken = message.bearerToken.split("Bearer ")[1];
    const isVerified = verifyAccessToken(accessToken);

    if (isVerified) {
      openConnections.set(connectionId, {
        connection: openConnection!.connection,
        authorized: true,
      });
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
