import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, type FormProps } from "antd";
import { api } from "../../../lib/api";
import { useCurrentUserStore } from "../../../lib/state/current-user";
import { jwtDecode } from "jwt-decode";
import { persistUserSession } from "../../../lib/local-storage/user";

type LoginFormItems = {
  username: string;
  password: string;
};

const { useForm } = Form;

const LoginForm = () => {
  const [form] = useForm<LoginFormItems>();
  const [setAuthorization, setUserInfo] = useCurrentUserStore((state) => [
    state.setAuthorization,
    state.setUserInfo,
  ]);

  const handleSuccess: FormProps<LoginFormItems>["onFinish"] = async (
    values,
  ) => {
    const v = await api({ apiAction: "login", body: values });

    setAuthorization({
      isAuthorized: true,
      accessToken: v.accessToken || "",
      refreshToken: v.refreshToken || "",
    });

    const decoded: Partial<{ userID: string; username: string }> = jwtDecode(
      v.accessToken || "",
    );

    setUserInfo({
      userID: decoded.userID || "",
      username: decoded.username || "",
    });
  };

  const handleFailed: FormProps<LoginFormItems>["onFinishFailed"] = (
    errorInfo,
  ) => {
    message.error(`Login failed. Please check your credentials. ${errorInfo}`);
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "0 auto", marginTop: 50 }}>
      <Form
        form={form}
        name="login"
        onFinish={handleSuccess}
        onFinishFailed={handleFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
