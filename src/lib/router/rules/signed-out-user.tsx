import { Navigate, Outlet, Route } from "react-router-dom";
import { signedOutUserRoutes } from "../../constants/routes";
import { SIGNED_IN_REDIRECT } from "../../constants/redirect";

type Props = {
  isAuthenticated: boolean;
  redirectPath?: string;
};
export const SignedOutUserRule = ({
  isAuthenticated,
  redirectPath = SIGNED_IN_REDIRECT,
}: Props) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const getSignedOutUserRoutes = () => {
  return signedOutUserRoutes.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ));
};
