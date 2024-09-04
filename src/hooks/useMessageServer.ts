import { useCallback, useEffect, useRef } from "react";
import {
  useChatHistory,
  type ChatHistoryAction,
} from "../lib/state/chat-history";
import { useWebSocket } from "../lib/state/web-socket";

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

const useMessageServer = () => {
  const chatHistoryActions = useChatHistory(
    (state) => state.chatHistoryActions,
  );

  const webSocket = useWebSocket((state) => state.webSocket);
  const setWebSocket = useWebSocket((state) => state.setWebSocket);
  const webSocketRef = useRef<WebSocket | null>(null);

  const webSocketUrl = "ws://localhost:8080";
  console.log("wtf: ", webSocketUrl);

  const initializeWebSocket = useCallback(() => {
    if (webSocket !== null && webSocket.readyState === WebSocket.OPEN) {
      webSocketRef.current = webSocket;
    }

    if (!webSocket && !webSocketRef.current) {
      const ws = createWebSocket(webSocketUrl, chatHistoryActions);
      webSocketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setWebSocket(ws);
      };
      ws.onclose = (event) => {
        if (event.wasClean) {
          console.log(
            `Closed cleanly, code=${event.code}, reason=${event.reason}`,
          );
        } else {
          console.error("Connection died");
        }

        setWebSocket(null);

        webSocketRef.current = null;
      };
    }

    return () => {
      if (webSocketRef.current) {
        console.log("Closing WebSocket");
        webSocketRef.current.close();
        setWebSocket(null);
        webSocketRef.current = null;
      }
    };
  }, [webSocket, setWebSocket, webSocketUrl]);

  useEffect(() => {
    const cleanup = initializeWebSocket();
    return cleanup;
  }, [initializeWebSocket]);
};

export default useMessageServer;
