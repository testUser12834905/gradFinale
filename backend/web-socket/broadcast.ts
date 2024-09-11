import { openConections } from ".";
import type { Database } from "../database/models";

export default async function broadcastMessage(database: Database) {
  openConections.forEach(async (connection) => {
    const fullChatHistory = await database.getFullChatHistory();

    const socket = connection.connection;

    if (socket.readyState === socket.OPEN) {
      socket.send(
        JSON.stringify({ type: "chatHistory", data: fullChatHistory }),
      );
    }
  });
}

export function requestRevalidation() {
  openConections.forEach((connection) => {
    const socket = connection.connection;

    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ type: "revalidate" }));
    }
    connection.authorized = false;
  });
}
