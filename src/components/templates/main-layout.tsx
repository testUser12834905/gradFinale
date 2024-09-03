import { useEffect, type ReactNode } from "react";
import useMessageServer from "../../hooks/useMessageServer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  useMessageServer();
  return <div style={{ minHeight: "95vh" }}>{children}</div>;
};

export default MainLayout;
