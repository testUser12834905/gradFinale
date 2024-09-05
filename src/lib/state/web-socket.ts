import { create } from "zustand";

type WebSocketState = {
  webSocket: WebSocket | null;
};

type WebSocketAction = {
  setWebSocket: (webSocket: WebSocketState["webSocket"]) => void;
  closeWebSocket: () => void;
};

export const useWebSocket = create<WebSocketState & WebSocketAction>((set) => ({
  webSocket: null,
  setWebSocket: (webSocket) => set({ webSocket }),
  closeWebSocket: () =>
    set((state) => {
      state.webSocket?.close();
      return { webSocket: null };
    }),
}));
