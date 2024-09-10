import { Navigate, Outlet, Route } from "react-router-dom";
import { protectedRoutes } from "../../constants/routes";
import { GENERIC_REDIRECT } from "../../constants/redirect";

type Props = {
  isAuthenticated: boolean;
  redirectPath?: string;
};
export const ProtectedRule = ({
  isAuthenticated,
  redirectPath = GENERIC_REDIRECT,
}: Props) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const getProtectedRoutes = () => {
  return protectedRoutes.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ));
};
