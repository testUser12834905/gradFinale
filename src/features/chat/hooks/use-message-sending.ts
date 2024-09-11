import type { WebSocketMessage } from "../../../../shared/types/ws-message";
import { useCurrentUserStore } from "../../../lib/state/current-user";
import { useWebSocket } from "../../../lib/state/web-socket";

const useMessageSending = () => {
  const webSocket = useWebSocket((state) => state.webSocket);
  const userID = useCurrentUserStore((state) => state.userID);

  return (message: string): boolean => {
    if (!message) return false;

    const chatRecord: WebSocketMessage = {
      type: "addChatMessage",
      data: {
        id: undefined,
        userID: userID,
        content: message,
        timestamp: new Date().getTime(),
      },
    };

    webSocket?.send(JSON.stringify(chatRecord));
    return true;
  };
};

export default useMessageSending;
