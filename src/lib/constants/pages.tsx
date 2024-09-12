import type { ReactNode } from "react";
import ChatPage from "../../features/chat/ChatPage";
import LoginPage from "../../features/login/LoginPage";
import LogoutPage from "../../features/logout/LogoutPage";
import ErrorPage from "../../features/error/ErrorPage";
import HomePage from "../../features/home/HomePage";

export const pages: Record<string, ReactNode> = {
  Home: <HomePage />,
  Chat: <ChatPage />,
  Login: <LoginPage />,
  Logout: <LogoutPage />,
  Error404: (
    <ErrorPage
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  ),
  Error403: (
    <ErrorPage
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  ),
  Error500: (
    <ErrorPage
      status="500"
      title="500"
      subTitle="Sorry, something went wrong on our server."
    />
  ),
};
