import type { ChatMessage } from "../src/types/chat-message";

export class Database {
  chatHistory: ChatMessage[];

  constructor() {
    this.chatHistory = [];
  }

  addToChatHistory(chatMessage: ChatMessage) {
    this.chatHistory.push(chatMessage);
  }

  getFullChatHistory() {
    return this.chatHistory;
  }
}
