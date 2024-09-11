export type WebSocketState = {
  webSocket: WebSocket | null;
};

export type WebSocketActions = {
  createWebSocket: (
    messageApi: MessageInstance,
    webSocketUrl: string,
    chatHistoryActions: ChatHistoryAction["chatHistoryActions"],
    bearToken: string,
  ) => void;
  closeWebSocket: () => void;
};
