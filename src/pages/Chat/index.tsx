import { Button, Input, Space } from "antd";
import SendChatMessage from "./components/send-chat-message";
import ChatBubble from "./components/chat-bubble";
import useChat from "./use-chat";

type Props = {};

const Chat = (props: Props) => {
  const chatHistory = useChat();

  return (
    <>
      {chatHistory.map((message, index) => (
        <ChatBubble
          key={index}
          content={message.content}
          isCurrentUser={!!message.userID}
          avatar={""}
        />
      ))}
      {/* <ChatBubble */}
      {/*   content="Hello, how are you?" */}
      {/*   isCurrentUser={false} */}
      {/*   avatar="https://example.com/other-avatar.png" */}
      {/* /> */}
      {/* <ChatBubble */}
      {/*   content="I'm doing great, thanks for asking!" */}
      {/*   isCurrentUser={true} */}
      {/*   avatar="https://example.com/user-avatar.png" */}
      {/* /> */}

      <SendChatMessage />
    </>
  );
};

export default Chat;
