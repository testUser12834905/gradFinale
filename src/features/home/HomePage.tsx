import { Result, Button } from "antd";
import { useCurrentUserStore } from "../../lib/state/current-user";
import type { ResultStatusType } from "antd/es/result";
import { useNavigate } from "react-router-dom";

type DataToDisplay = {
  status: ResultStatusType;
  title: string;
  subTitle: string;
  buttonText: string;
  navigateTo: string;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthorized, username] = useCurrentUserStore((state) => [
    state.isAuthorized,
    state.username,
  ]);

  const data: DataToDisplay = isAuthorized
    ? {
        status: "404",
        title: `Hi ${username}`,
        subTitle:
          "We are sorry, but this is not the page you are looking forward.",
        buttonText: "Join chat now",
        navigateTo: "/chat",
      }
    : {
        status: "403",
        title: "403",
        subTitle: "Sorry, you are not authorized to access this page.",
        buttonText: "Log in",
        navigateTo: "/login",
      };

  return (
    <Result
      status={data.status}
      title={data.title}
      subTitle={data.subTitle}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(data.navigateTo);
          }}
        >
          {data.buttonText}
        </Button>
      }
    />
  );
};

export default HomePage;
