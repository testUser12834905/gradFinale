import { v4 as uuidv4 } from "uuid";
import { openConections as openConnections } from ".";
import type { ChatMessage } from "../../shared/types/chat-message";
import type { WebSocketMessage } from "../../shared/types/ws-message";
import type { Database } from "../database/models";

export const handleWebSocketMessage = async (
  message: WebSocketMessage,
  database: Database,
): Promise<void> => {
  switch (message.type) {
    case "addChatMessage":
      console.log("md", message.data);
      const chatMessage: ChatMessage = {
        ...message.data,
        id: message.data.id || uuidv4(),
      };
      await database.addToChatHistory(message.data);
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
