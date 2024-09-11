import type { MessageInstance } from "antd/es/message/interface";
import type { ChatHistoryAction } from "../chat-history/types";

export const createWebSocket = (
  url: string,
  chatHistoryActions: ChatHistoryAction["chatHistoryActions"],
  messageApi: MessageInstance,
  bearerToken: string,
): WebSocket => {
  const newSocket = new WebSocket(url);

  newSocket.onopen = () => {
    newSocket.send(
      JSON.stringify({ type: "authorize", bearerToken: bearerToken }),
    );
    messageApi.success("WebSocket connected", 0.8);
  };

  newSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case "chatHistory":
        chatHistoryActions.initialize(message.data);
        break;
      case "revalidate":
        newSocket.send(
          JSON.stringify({ type: "authorize", bearerToken: bearerToken }),
        );
        break;

      default:
        break;
    }
  };

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
