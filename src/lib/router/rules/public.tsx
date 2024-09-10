import { Route } from "react-router-dom";
import { publicRoutes } from "../../constants/routes";

export const getPublicRoutes = () => {
  return publicRoutes.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ));
};
