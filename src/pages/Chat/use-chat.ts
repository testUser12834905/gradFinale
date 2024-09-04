import { useChatHistory } from "../../lib/state/chat-history";

const useChat = () => {
  const chatHistory = useChatHistory((state) => state.chatHistory);

  return chatHistory;
};

export default useChat;
