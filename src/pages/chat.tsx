import { Button, Input, Space } from "antd";

type Props = {};

const Chat = (props: Props) => {
  return (
    <div
      style={{
        bottom: 20,
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        width: "95%",
      }}
    >
      <Space.Compact style={{ width: "100%" }}>
        <Input placeholder="message something" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
    </div>
  );
};

export default Chat;
