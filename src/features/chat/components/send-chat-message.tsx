import { Button, Input, Space } from "antd";
import { forwardRef, useState } from "react";
import { useWebSocket } from "../../../lib/state/web-socket";
import type { ChatMessage } from "../../../../shared/types/chat-message";
import type { WebSocketMessage } from "../../../../shared/types/ws-message";

export const MESSAGE_INPUT_MARGIN = 20;

const MessageInput = forwardRef<HTMLDivElement>((props, ref) => {
  const webSocket = useWebSocket((state) => state.webSocket);

  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (!message) return;

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
    setMessage("");
  };

  return (
    <div
      ref={ref}
      style={{
        bottom: MESSAGE_INPUT_MARGIN,
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        width: "95%",
      }}
    >
      <Space.Compact style={{ width: "100%" }}>
        <Input
          size="large"
          placeholder="message something"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={sendMessage}
        />
        <Button size="large" type="primary" onClick={sendMessage}>
          Send
        </Button>
      </Space.Compact>
    </div>
  );
});

export default MessageInput;
