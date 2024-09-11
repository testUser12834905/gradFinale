import { Result, Button } from "antd";
import type { ResultStatusType } from "antd/es/result";
import { useNavigate } from "react-router-dom";

type Props = {
  status: ResultStatusType;
  title: string;
  subTitle: string;
};

const ErrorPage = ({ status, title, subTitle }: Props) => {
  const navigate = useNavigate();
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorPage;
