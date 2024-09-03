import { create } from "zustand";

type WebSocketState = {
  webSocket: WebSocket | null;
};

type WebSocketAction = {
  setWebSocket: (webSocket: WebSocketState["webSocket"]) => void;
};

export const useWebSocket = create<WebSocketState & WebSocketAction>((set) => ({
  webSocket: null,
  setWebSocket: (webSocket) => set({ webSocket }),
}));
