import type { ReactNode } from "react";
import ChatPage from "../../features/chat/ChatPage";
import LoginPage from "../../features/login/LoginPage";

export const pages: Record<string, ReactNode> = {
  Chat: <ChatPage />,
  Login: <LoginPage />,
};
