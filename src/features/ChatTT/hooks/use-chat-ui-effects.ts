import { useEffect, useState } from "react";
import { useChatHistory } from "../../../lib/state/chat-history";
import { MESSAGE_INPUT_MARGIN } from "../components/send-chat-message";

const useChatUIEffects = (ref: React.RefObject<HTMLDivElement>) => {
  const chatHistory = useChatHistory((state) => state.chatHistory);
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    //
    // BUG: depending on chatHistory will create an interesting bug,
    // that when someone else posts a new chat it will also scroll down to the bottom
    // it would be a nice to have to have a scroll to newest upon not current user Message, but
    // scroll to bottom if curent user posts a message
  }, [chatHistory]);

  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight + 2 * MESSAGE_INPUT_MARGIN);
    }
  }, []);

  return { height };
};

export default useChatUIEffects;
