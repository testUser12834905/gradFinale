import type { ChatMessage } from "./chat-message";

export type WebSocketMessage = SendChatMessage | AuthoriceConnection;

type SendChatMessage = {
  type: "addChatMessage";
  data: ChatMessage;
};

type AuthoriceConnection = {
  type: "authorize";
  bearerToken: string;
};
