import { useRef } from "react";
import ChatBubble from "./components/chat-bubble";
import MessageInput from "./components/send-chat-message";
import useChat from "./hooks/use-chat";
import useChatUIEffects from "./hooks/use-chat-ui-effects";
import { useCurrentUserStore } from "../../lib/state/current-user";

const Chat = () => {
  const userID = useCurrentUserStore((state) => state.userID);
  const { chatHistory } = useChat();
  const componentRef = useRef<HTMLDivElement>(null);
  const { height } = useChatUIEffects(componentRef);

  return (
    <>
      <div style={{ marginBottom: height }}>
        {chatHistory.map((message, index) => (
          <ChatBubble
            key={index}
            content={message.content}
            isCurrentUser={userID === message.userID}
            avatar={""}
            username={message.User.username}
          />
        ))}
      </div>
      <MessageInput ref={componentRef} />
    </>
  );
};

export default Chat;
