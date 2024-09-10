import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getProtectedRoutes, ProtectedRule } from "./rules/protected";
import { signedOutUserRoutes } from "../constants/routes";
import {
  getSignedOutUserRoutes,
  SignedOutUserRule,
} from "./rules/signed-out-user";
import { getPublicRoutes } from "./rules/public";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRule isAuthenticated={true} />}>
          {getProtectedRoutes()}
        </Route>
        <Route element={<SignedOutUserRule isAuthenticated={true} />}>
          {getSignedOutUserRoutes()}
        </Route>
        {getPublicRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
