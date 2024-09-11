import type { WebSocketMessage } from "../../shared/types/ws-message";
import type { Database } from "../database";

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
