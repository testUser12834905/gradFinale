import type { ReactNode } from "react";
import App from "../../App";
import Chat from "../../pages/Chat";

type Route = {
  path: string;
  element: ReactNode;
};

const protectedRoutes: Route[] = [
  { path: "chat", element: <Chat /> },
  { path: "/logout", element: <App /> },
];

export const allRoutes: Route[] = [
  ...protectedRoutes,
  { path: "/", element: <App /> },
  { path: "/login", element: <App /> },
];
