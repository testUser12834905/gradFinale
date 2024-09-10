import type { ReactNode } from "react";
import { pages } from "./pages";

type Route = {
  path: string;
  element: ReactNode;
};

export const protectedRoutes: Route[] = [
  { path: "/chat", element: pages.Chat },
  { path: "/logout", element: <></> },
];

export const signedOutUserRoutes: Route[] = [
  { path: "/login", element: pages.Login },
];

export const publicRoutes: Route[] = [
  { path: "/", element: <>Test kube deployment</> },
];

export const allRoutes: Route[] = [
  ...protectedRoutes,
  ...publicRoutes,
  ...signedOutUserRoutes,
];
