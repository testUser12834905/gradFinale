import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProtectedRoutes, ProtectedRule } from "./rules/protected";
import { getPublicRoutes } from "./rules/public";
import {
  getSignedOutUserRoutes,
  SignedOutUserRule,
} from "./rules/signed-out-user";

const Router = () => {
  const auth = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRule isAuthenticated={auth} />}>
          {getProtectedRoutes()}
        </Route>
        <Route element={<SignedOutUserRule isAuthenticated={auth} />}>
          {getSignedOutUserRoutes()}
        </Route>
        {getPublicRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
