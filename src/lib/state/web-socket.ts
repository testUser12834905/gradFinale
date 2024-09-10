import type { MessageInstance } from "antd/es/message/interface";
import { create } from "zustand";
import type { ChatHistoryAction } from "./chat-history";

type WebSocketState = {
  webSocket: WebSocket | null;
};

type WebSocketAction = {
  setWebSocket: (webSocket: WebSocketState["webSocket"]) => void;
  createWebSocket: (
    messageApi: MessageInstance,
    webSocketUrl: string,
    chatHistoryActions: ChatHistoryAction["chatHistoryActions"],
    bearToken: string,
  ) => void;
  closeWebSocket: (messageApi: MessageInstance) => void;
};

const createWebSocket = (
  url: string,
  chatHistoryActions: ChatHistoryAction["chatHistoryActions"],
  messageApi: MessageInstance,
  bearerToken: string,
): WebSocket => {
  const newSocket = new WebSocket(url);

  newSocket.onopen = () => {
    newSocket.send(
      JSON.stringify({ type: "authorize", bearerToken: "Bear_token" }),
    );
    messageApi.success("WebSocket connected", 0.8);
  };

  newSocket.onmessage = (event) => {
    const chatHistory = JSON.parse(event.data);
    chatHistoryActions.initialize(chatHistory);
    console.log("Message from server:", event);
  };

  // newSocket.onerror = () => {
  //   messageApi.error("WebSocket error", 0.8);
  // };

  newSocket.onclose = (event): void => {
    if (event.wasClean) {
      messageApi.warning(
        `Closed cleanly, code=${event.code}, reason=${event.reason}`,
        0.8,
      );
    } else {
      messageApi.error("Connection died", 0.8);
    }
  };

  return newSocket;
};

export const useWebSocket = create<WebSocketState & WebSocketAction>((set) => ({
  webSocket: null,
  createWebSocket: (
    messageApi: MessageInstance,
    url: string,
    dataActions: ChatHistoryAction["chatHistoryActions"],
    bearToken: string,
  ): void =>
    set((state) => {
      if (state.webSocket) {
        return {};
      }
      const ws = createWebSocket(url, dataActions, messageApi, bearToken);
      return { webSocket: ws };
    }),
  setWebSocket: (webSocket): void =>
    set((state) => {
      if (state.webSocket) {
        return {};
      }
      return { webSocket };
    }),
  closeWebSocket: (messageApi: MessageInstance): void =>
    set((state) => {
      console.log("fsdfs", state.webSocket);
      messageApi.warning("WebSocket connection was closed!", 0.8);
      if (!state.webSocket) {
        return {};
      }

      state.webSocket.close();
      return { webSocket: null };
    }),
}));
