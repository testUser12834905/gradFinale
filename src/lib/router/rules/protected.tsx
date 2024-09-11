import { Navigate, Outlet, Route } from "react-router-dom";
import { GENERIC_REDIRECT } from "../../constants/redirect";
import { protectedRoutes } from "../../constants/routes";
import { useCurrentUserStore } from "../../state/current-user";

type Props = {
  redirectPath?: string;
};

export const ProtectedRule = ({ redirectPath = GENERIC_REDIRECT }: Props) => {
  const isAuthorized = useCurrentUserStore((state) => state.isAuthorized);
  if (!isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export const getProtectedRoutes = () => {
  return protectedRoutes.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ));
};
