import type { MessageInstance } from "antd/es/message/interface";
import { useCallback, useEffect } from "react";
import { useChatHistory } from "../lib/state/chat-history";
import { useWebSocket } from "../lib/state/web-socket";
import config from "../lib/utils/config";
import { useCurrentUserStore } from "../lib/state/current-user";

// TODO: rename this to something more clear
const useMessageServer = (messageApi: MessageInstance) => {
  const isAuthorized = useCurrentUserStore((state) => state.isAuthorized);

  const chatHistoryActions = useChatHistory(
    (state) => state.chatHistoryActions,
  );

  const accessToken = useCurrentUserStore((state) => state.accessToken);

  const webSocket = useWebSocket((state) => state.webSocket);
  const createWebSocket = useWebSocket((state) => state.createWebSocket);
  const closeWebSocket = useWebSocket((state) => state.closeWebSocket);

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
      closeWebSocket(messageApi);
    };
  }, [webSocketUrl, isAuthorized, isAuthorized]);

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return cleanup;
  }, [initializeWebSocket, isAuthorized]);
};

export default useMessageServer;
