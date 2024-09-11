import { message } from "antd";
import { type ReactNode } from "react";
import useMessageWebSocket from "../../hooks/use-message-websocket";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();
  useMessageWebSocket(messageApi);

  return (
    <>
      {contextHolder}
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
