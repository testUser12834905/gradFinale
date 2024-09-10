import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, type FormProps } from "antd";

type LoginFormItems = {
  username: string;
  password: string;
};

const { useForm } = Form;

const LoginForm = () => {
  const [form] = useForm<LoginFormItems>();

  const onFinish: FormProps<LoginFormItems>["onFinish"] = (values) => {
    console.log("Success:", values);
    message.success("Login successful!");
  };

  const onFinishFailed: FormProps<LoginFormItems>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
    message.error("Login failed. Please check your credentials.");
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "0 auto", marginTop: 50 }}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
