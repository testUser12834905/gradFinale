import { useChatHistoryStore } from "../../../lib/state/chat-history";

const useChat = () => {
  const chatHistory = useChatHistoryStore((state) => state.chatHistory);

  return { chatHistory };
};

export default useChat;
