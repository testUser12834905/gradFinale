import type { ChatMessage } from "./chat-message";

export type WebSocketMessage = SendChatMessage | AuthoriceConnection;

type SendChatMessage = {
  type: "addChatMessage";
  data: Omit<ChatMessage, "User">;
};

type AuthoriceConnection = {
  type: "authorize";
  bearerToken: string;
};
