import { openConections } from ".";
import type { Database } from "../database";

export default async function broadcastMessage(database: Database) {
  openConections.forEach(async (openConnection) => {
    const fullChatHistory = await database.getFullChatHistory();

    const connection = openConnection.connection;

    if (connection.readyState === connection.OPEN) {
      connection.send(
        JSON.stringify({ type: "chatHistory", data: fullChatHistory }),
      );
    }
  });
}

export function requestRevalidation() {
  openConections.forEach((openConnection) => {
    const connection = openConnection.connection;

    if (connection.readyState === connection.OPEN) {
      connection.send(JSON.stringify({ type: "revalidate" }));
    }
    openConnection.authorized = false;
  });
}
