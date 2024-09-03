import { create } from "zustand";
import type { ChatMessage } from "../../types/chat-message";

type ChatHistoryState = {
  chatHistory: ChatMessage[];
};

export type ChatHistoryAction = {
  chatHistoryActions: {
    initialize: (data: ChatHistoryState["chatHistory"]) => void;
    // add: (data: ChatHistoryState["chatHistory"]) => void;
    // update: (data: ChatHistoryState["chatHistory"]) => void;
    // remove: (data: ChatHistoryState["chatHistory"]) => void;
  };
};

export const useChatHistory = create<ChatHistoryState & ChatHistoryAction>(
  (set) => ({
    chatHistory: [],
    chatHistoryActions: {
      initialize: (chatHistory) => set({ chatHistory }),
    },
  }),
);
