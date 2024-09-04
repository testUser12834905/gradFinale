import { Button, Input, Space } from "antd";
import { useWebSocket } from "../../../lib/state/web-socket";
import { useState } from "react";
import type { ChatMessage } from "../../../types/chat-message";

const SendChatMessage = () => {
  const webSocket = useWebSocket((state) => state.webSocket);

  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    if (!message) return;

    const chatRecord: ChatMessage = {
      id: 1,
      userID: 123,
      content: message,
      timestamp: new Date().getTime(),
    };

    webSocket?.send(JSON.stringify(chatRecord));
  };

  return (
    <div
      style={{
        bottom: 20,
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
        />
        <Button size="large" type="primary" onClick={sendMessage}>
          Send
        </Button>
      </Space.Compact>
    </div>
  );
};

export default SendChatMessage;
