import { useEffect, useState } from "react";
import { useChatHistory } from "../../../lib/state/chat-history";
import { MESSAGE_INPUT_MARGIN } from "../components/send-chat-message";

const useChat = () => {
  const chatHistory = useChatHistory((state) => state.chatHistory);

  return { chatHistory };
};

export default useChat;
