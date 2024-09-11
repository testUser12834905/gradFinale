import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../lib/state/current-user";

const LogoutPage = () => {
  const setAuthorization = useCurrentUserStore(
    (state) => state.setAuthorization,
  );

  useEffect(() => {
    return setAuthorization({ isAuthorized: false, accessToken: "" });
  }, []);

  return <Navigate to="/login" replace />;
};

export default LogoutPage;
