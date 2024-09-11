import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthorizationStore } from "../../lib/state/authorize";

const LogoutPage = () => {
  const setAuthorization = useAuthorizationStore(
    (state) => state.setAuthorization,
  );

  useEffect(() => {
    return setAuthorization(false, "");
  }, []);

  return <Navigate to="/login" replace />;
};

export default LogoutPage;
