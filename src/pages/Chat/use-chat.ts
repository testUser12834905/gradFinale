import { useEffect } from "react";
import { useChatHistory } from "../../lib/state/chat-history";

const useChat = () => {
  const chatHistory = useChatHistory((state) => state.chatHistory);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);

    //
    // BUG: depending on chatHistory will create an interesting bug,
    // that when someone else posts a new chat it will also scroll down to the bottom
    // it would be a nice to have to have a scroll to newest upon not current user Message, but
    // scroll to bottom if curent user posts a message
  }, [chatHistory]);

  return chatHistory;
};

export default useChat;
