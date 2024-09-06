import type { ReactNode } from "react";
import Chat from "../../features/chat/ChatPage";

type Route = {
  path: string;
  element: ReactNode;
};

const protectedRoutes: Route[] = [
  { path: "chat", element: <Chat /> },
  { path: "/logout", element: <></> },
];

export const allRoutes: Route[] = [
  ...protectedRoutes,
  { path: "/", element: <></> },
  { path: "/login", element: <></> },
];
