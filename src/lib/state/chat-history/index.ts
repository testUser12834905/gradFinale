import { create } from "zustand";
import type { ChatHistoryState, ChatHistoryAction } from "./types";

export const useChatHistoryStore = create<ChatHistoryState & ChatHistoryAction>(
  (set) => ({
    chatHistory: [],
    chatHistoryActions: {
      initialize: (chatHistory) => set({ chatHistory }),
    },
  }),
);
