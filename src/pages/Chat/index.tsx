import { Button, Input, Space } from "antd";
import SendChatMessage from "./components/send-chat-message";
import ChatBubble from "./components/chat-bubble";

type Props = {};

const Chat = (props: Props) => {
  return (
    <>
      <ChatBubble
        content="Hello, how are you?"
        isMe={false}
        avatar="https://example.com/other-avatar.png"
      />
      <ChatBubble
        content="I'm doing great, thanks for asking!"
        isMe={true}
        avatar="https://example.com/user-avatar.png"
      />

      <SendChatMessage />
    </>
  );
};

export default Chat;
