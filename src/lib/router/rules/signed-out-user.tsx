import { Navigate, Outlet, Route } from "react-router-dom";
import { SIGNED_IN_REDIRECT } from "../../constants/redirect";
import { signedOutUserRoutes } from "../../constants/routes";
import { useCurrentUserStore } from "../../state/current-user";

type Props = {
  redirectPath?: string;
};

export const SignedOutUserRule = ({
  redirectPath = SIGNED_IN_REDIRECT,
}: Props) => {
  const isAuthorized = useCurrentUserStore((state) => state.isAuthorized);
  if (isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const getSignedOutUserRoutes = () => {
  return signedOutUserRoutes.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ));
};
