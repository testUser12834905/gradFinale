import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, type FormProps } from "antd";
import { api } from "../../../lib/api";
import { useAuthorizationStore } from "../../../lib/state/authorize";

type LoginFormItems = {
  username: string;
  password: string;
};

const { useForm } = Form;

const LoginForm = () => {
  const [form] = useForm<LoginFormItems>();
  const setAuthorization = useAuthorizationStore(
    (state) => state.setAuthorization,
  );

  const handleSuccess: FormProps<LoginFormItems>["onFinish"] = async (
    values,
  ) => {
    console.log("Success:", values);
    message.success("Login successful!");
    const v = await api({ apiAction: "login", body: values });
    console.log(v);
    setAuthorization(true, v.accessToken || "");
    // store the tokens somehow
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
