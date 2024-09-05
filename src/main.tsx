import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/templates/main-layout.tsx";
import "./index.css";
import { allRoutes } from "./lib/constants/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout>
      <BrowserRouter>
        <Routes>
          {allRoutes.map((route) => (
            <Route path={route.path} element={route.element} key={route.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </MainLayout>
  </StrictMode>,
);
