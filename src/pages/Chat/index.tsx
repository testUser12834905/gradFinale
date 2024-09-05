import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/chat-bubble";
import MessageInput, {
  MESSAGE_INPUT_MARGIN,
} from "./components/send-chat-message";
import useChat from "./use-chat";

type Props = {};

const Chat = (props: Props) => {
  const chatHistory = useChat();

  const componentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (componentRef.current) {
      setHeight(componentRef.current.clientHeight + 2 * MESSAGE_INPUT_MARGIN);
    }
  }, []);
  console.log(componentRef);

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

      <MessageInput ref={componentRef} />
    </>
  );
};

export default Chat;
