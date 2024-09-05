import { type ReactNode } from "react";
import useMessageServer from "../../hooks/useMessageServer";
import { message } from "antd";
import { constrainedMemory } from "process";

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
