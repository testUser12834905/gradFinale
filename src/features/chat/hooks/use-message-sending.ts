import type { WebSocketMessage } from "../../../../shared/types/ws-message";
import { useWebSocket } from "../../../lib/state/web-socket";

const useMessageSending = () => {
  const webSocket = useWebSocket((state) => state.webSocket);

  return (message: string): boolean => {
    if (!message) return false;

    const chatRecord: WebSocketMessage = {
      type: "addChatMessage",
      data: {
        id: undefined,
        userID: "29eb8c2a-8d16-4f9f-820f-70f9ace8a18f",
        content: message,
        timestamp: new Date().getTime(),
      },
    };

    webSocket?.send(JSON.stringify(chatRecord));
    return true;
  };
};

export default useMessageSending;
