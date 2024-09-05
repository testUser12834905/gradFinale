import { useCallback, useEffect, useRef } from "react";
import {
  useChatHistory,
  type ChatHistoryAction,
} from "../lib/state/chat-history";
import { useWebSocket } from "../lib/state/web-socket";
import type { MessageInstance } from "antd/es/message/interface";

const createWebSocket = (
  url: string,
  dataActions: ChatHistoryAction["chatHistoryActions"],
) => {
  const newSocket = new WebSocket(url);

  newSocket.onopen = () => {
    console.log("WebSocket connected");
  };

  newSocket.onmessage = (event) => {
    const ch = JSON.parse(event.data);
    dataActions.initialize(ch);
    console.log("Message from server:", event);
  };

  newSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  newSocket.onclose = (event) => {
    if (event.wasClean) {
      console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
      console.error("Connection died");
    }
  };

  return newSocket;
};

// TODO: rename this to something more clear
const useMessageServer = (messageApi: MessageInstance) => {
  const chatHistoryActions = useChatHistory(
    (state) => state.chatHistoryActions,
  );

  const webSocket = useWebSocket((state) => state.webSocket);
  const createWebSocket = useWebSocket((state) => state.createWebSocket);
  const closeWebSocket = useWebSocket((state) => state.closeWebSocket);

  const webSocketUrl = "ws://localhost:8080";
  console.log("wtf: ", webSocketUrl);

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
