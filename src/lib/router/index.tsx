import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProtectedRoutes, ProtectedRule } from "./rules/protected";
import { getPublicRoutes } from "./rules/public";
import {
  getSignedOutUserRoutes,
  SignedOutUserRule,
} from "./rules/signed-out-user";
import { useCurrentUserStore } from "../state/current-user";

const Router = () => {
  const isAuthorized = useCurrentUserStore((state) => state.isAuthorized);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRule isAuthenticated={isAuthorized} />}>
          {getProtectedRoutes()}
        </Route>
        <Route element={<SignedOutUserRule isAuthenticated={isAuthorized} />}>
          {getSignedOutUserRoutes()}
        </Route>
        {getPublicRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
