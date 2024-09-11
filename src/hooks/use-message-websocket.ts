import type { MessageInstance } from "antd/es/message/interface";
import { useCallback, useEffect } from "react";
import { useChatHistoryStore } from "../lib/state/chat-history";
import { useWebSocketStore } from "../lib/state/web-socket";
import config from "../lib/utils/config";
import { useCurrentUserStore } from "../lib/state/current-user";

const useMessageWebSocket = (messageApi: MessageInstance) => {
  const [isAuthorized, accessToken] = useCurrentUserStore((state) => [
    state.isAuthorized,
    state.accessToken,
  ]);

  const chatHistoryActions = useChatHistoryStore(
    (state) => state.chatHistoryActions,
  );

  const [webSocket, createWebSocket, closeWebSocket] = useWebSocketStore(
    (state) => [state.webSocket, state.createWebSocket, state.closeWebSocket],
  );

  const webSocketUrl = config("backendWebSocket");

  const initializeWebSocket = useCallback(() => {
    if (!webSocket && isAuthorized) {
      createWebSocket(
        messageApi,
        webSocketUrl,
        chatHistoryActions,
        `Bearer ${accessToken}`,
      );
    }

    return () => {
      closeWebSocket();
    };
  }, [webSocketUrl, isAuthorized, isAuthorized]);

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return cleanup;
  }, [initializeWebSocket, isAuthorized]);
};

export default useMessageWebSocket;
