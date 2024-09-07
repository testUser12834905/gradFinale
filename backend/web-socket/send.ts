import type ws from "ws";
import type { Database } from "../database";

export const sendInitialState = (
  connection: ws.WebSocket,
  database: Database,
) => {
  connection.send(JSON.stringify(database.getFullChatHistory()));
};
