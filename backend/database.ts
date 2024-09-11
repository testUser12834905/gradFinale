import type { ChatMessage } from "../shared/types/chat-message";
import type { User } from "./auth/generate-tokens";

export class Database {
  chatHistory: ChatMessage[];
  users: User[];

  constructor() {
    this.chatHistory = [];
    this.users = [];
  }

  findUser(username: string) {
    return this.users.find((user) => user.username === username);
  }

  createUser(user: User) {
    this.users.push(user);
  }

  addToChatHistory(chatMessage: ChatMessage) {
    this.chatHistory.push(chatMessage);
  }

  getFullChatHistory() {
    return this.chatHistory;
  }
}
