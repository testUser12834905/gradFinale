import type { MessageInstance } from "antd/es/message/interface";
import { create } from "zustand";
import type { ChatHistoryAction } from "../chat-history";
import { createWebSocket } from "./handlers";
import type { WebSocketActions, WebSocketState } from "./types";

export const useWebSocketStore = create<WebSocketState & WebSocketActions>(
  (set) => ({
    webSocket: null,
    createWebSocket: (
      messageApi: MessageInstance,
      url: string,
      dataActions: ChatHistoryAction["chatHistoryActions"],
      bearToken: string,
    ): void =>
      set((state) => {
        if (state.webSocket) {
          state.closeWebSocket();
        }
        const ws = createWebSocket(url, dataActions, messageApi, bearToken);
        return { webSocket: ws };
      }),
    closeWebSocket: (): void =>
      set((state) => {
        if (!state.webSocket) {
          return {};
        }
        state.webSocket.close();
        return { webSocket: null };
      }),
  }),
);
