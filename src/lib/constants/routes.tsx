import type { ReactNode } from "react";
import { pages } from "./pages";

type Route = {
  path: string;
  element: ReactNode;
};

const protectedRoutes: Route[] = [
  { path: "chat", element: pages.Chat },
  { path: "/logout", element: <></> },
];

export const allRoutes: Route[] = [
  ...protectedRoutes,
  { path: "/", element: <></> },
  { path: "/login", element: <></> },
];
