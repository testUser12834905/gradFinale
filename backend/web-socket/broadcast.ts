import { openConections } from ".";
import type { Database } from "../database";

export default function broadcastMessage(database: Database) {
  openConections.forEach((connection) => {
    const socket = connection.connection;
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(database.getFullChatHistory()));
    }
  });
}
