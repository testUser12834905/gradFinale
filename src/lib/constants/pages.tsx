import type { ReactNode } from "react";
import ChatPage from "../../features/chat/ChatPage";
import LoginPage from "../../features/login/LoginPage";
import LogoutPage from "../../features/logout/LogoutPage";

export const pages: Record<string, ReactNode> = {
  Chat: <ChatPage />,
  Login: <LoginPage />,
  Logout: <LogoutPage />,
};
