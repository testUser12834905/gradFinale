import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { allRoutes } from "./lib/constants/routes.tsx";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div style={{ minHeight: "95vh" }}>{children}</div>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
          {allRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </Layout>
  </StrictMode>,
);
