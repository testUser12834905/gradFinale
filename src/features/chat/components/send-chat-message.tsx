import { Button, Input, Space } from "antd";
import { forwardRef, useState } from "react";
import useMessageSending from "../hooks/use-message-sending";

export const MESSAGE_INPUT_MARGIN = 20;

const MessageInput = forwardRef<HTMLDivElement>((props, ref) => {
  const [message, setMessage] = useState<string>("");
  const sendMessage = useMessageSending();

  const handleMessageSending = () => {
    const isSuccess = sendMessage(message);
    if (!isSuccess) return;
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
          onPressEnter={handleMessageSending}
        />
        <Button size="large" type="primary" onClick={handleMessageSending}>
          Send
        </Button>
      </Space.Compact>
    </div>
  );
});

export default MessageInput;
