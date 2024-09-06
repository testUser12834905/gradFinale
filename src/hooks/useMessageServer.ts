import { useCallback, useEffect, useRef } from "react";
import {
  useChatHistory,
  type ChatHistoryAction,
} from "../lib/state/chat-history";
import { useWebSocket } from "../lib/state/web-socket";
import type { MessageInstance } from "antd/es/message/interface";

// TODO: rename this to something more clear
const useMessageServer = (messageApi: MessageInstance) => {
  const chatHistoryActions = useChatHistory(
    (state) => state.chatHistoryActions,
  );

  const webSocket = useWebSocket((state) => state.webSocket);
  const createWebSocket = useWebSocket((state) => state.createWebSocket);
  const closeWebSocket = useWebSocket((state) => state.closeWebSocket);

  const webSocketUrl = "ws://localhost:8080";

  const initializeWebSocket = useCallback(() => {
    if (!webSocket) {
      createWebSocket(messageApi, webSocketUrl, chatHistoryActions);
    }

    return () => {
      closeWebSocket(messageApi);
    };
  }, [webSocketUrl]);

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return cleanup;
  }, [initializeWebSocket]);
};

export default useMessageServer;
