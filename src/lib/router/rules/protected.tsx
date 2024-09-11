import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { protectedRoutes } from "../../constants/routes";
import { GENERIC_REDIRECT } from "../../constants/redirect";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

type Props = {
  isAuthenticated: boolean;
  redirectPath?: string;
};
export const ProtectedRule = ({
  isAuthenticated,
  redirectPath = GENERIC_REDIRECT,
}: Props) => {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      {isAuthenticated && (
        <FloatButton.Group
          style={{ insetInlineEnd: 30, insetBlockEnd: 75 }}
          trigger="click"
          icon={<UserOutlined />}
        >
          <FloatButton
            onClick={() => navigate("/logout", { replace: true })}
            icon={<LogoutOutlined />}
          />
        </FloatButton.Group>
      )}
      <Outlet />
    </>
  );
};

export const getProtectedRoutes = () => {
  return protectedRoutes.map((route) => (
    <Route path={route.path} element={route.element} key={route.path} />
  ));
};
