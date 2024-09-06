import type { WebSocketMessage } from "../shared/types/ws-message";
import type { Database } from "./database";

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
