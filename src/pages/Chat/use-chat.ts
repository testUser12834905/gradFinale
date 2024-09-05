import { useEffect } from "react";
import { useChatHistory } from "../../lib/state/chat-history";

const useChat = () => {
  const chatHistory = useChatHistory((state) => state.chatHistory);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatHistory]);

  return chatHistory;
};

export default useChat;
