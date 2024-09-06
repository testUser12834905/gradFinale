import { useRef } from "react";
import ChatBubble from "./components/chat-bubble";
import MessageInput from "./components/send-chat-message";
import useChat from "./use-chat";

const Chat = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { chatHistory, height } = useChat(componentRef);

  return (
    <>
      <div style={{ marginBottom: height }}>
        {chatHistory.map((message, index) => (
          <ChatBubble
            key={index}
            content={message.content}
            isCurrentUser={!!message.userID}
            avatar={""}
          />
        ))}
      </div>
      <MessageInput ref={componentRef} />
    </>
  );
};

export default Chat;
