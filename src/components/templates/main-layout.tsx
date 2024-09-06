import { type ReactNode } from "react";
import useMessageServer from "../../hooks/use-message-server";
import { message } from "antd";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();
  useMessageServer(messageApi);

  return (
    <>
      {contextHolder}
      <div style={{ minHeight: "95vh" }}>{children}</div>
    </>
  );
};

export default MainLayout;
