import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthorizedLayout } from "../../components/templates/authorized-layout";
import { getProtectedRoutes, ProtectedRule } from "./rules/protected";
import { getPublicRoutes } from "./rules/public";
import {
  getSignedOutUserRoutes,
  SignedOutUserRule,
} from "./rules/signed-out-user";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedLayout />}>
          <Route element={<ProtectedRule />}>{getProtectedRoutes()}</Route>
          <Route element={<SignedOutUserRule />}>
            {getSignedOutUserRoutes()}
          </Route>
          {getPublicRoutes()}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
