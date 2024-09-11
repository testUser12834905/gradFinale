import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../lib/state/current-user";

export const AuthorizedLayout = () => {
  const isAuthorized = useCurrentUserStore((state) => state.isAuthorized);
  const navigate = useNavigate();

  return (
    <>
      {isAuthorized && (
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
