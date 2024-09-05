import type { ChatMessage } from "./chat-message";

export type WebSocketMessage = SendChatMessage;

type SendChatMessage = {
  type: "addChatMessage";
  data: ChatMessage;
};
