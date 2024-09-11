import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../../lib/state/current-user";

const LogoutPage = () => {
  const logout = useCurrentUserStore((state) => state.logout);

  useEffect(() => {
    return () => {
      logout();
    };
  }, []);

  return <Navigate to="/login" replace />;
};

export default LogoutPage;
