import type ws from "ws";
import type { Database } from "../database";

export const sendInitialState = async (
  connection: ws.WebSocket,
  database: Database,
) => {
  const fullChatHistory = await database.getFullChatHistory();
  connection.send(
    JSON.stringify({ type: "chatHistory", data: fullChatHistory }),
  );
};
