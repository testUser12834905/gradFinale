import type { WebSocketMessage } from "../../../../shared/types/ws-message";
import { useWebSocket } from "../../../lib/state/web-socket";

const useMessageSending = () => {
  const webSocket = useWebSocket((state) => state.webSocket);

  return (message: string): boolean => {
    if (!message) return false;

    const chatRecord: WebSocketMessage = {
      type: "addChatMessage",
      data: {
        id: 1,
        userID: Math.round(Math.random()),
        content: message,
        timestamp: new Date().getTime(),
      },
    };

    webSocket?.send(JSON.stringify(chatRecord));
    return true;
  };
};

export default useMessageSending;
