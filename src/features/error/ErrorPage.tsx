import { Result, Button } from "antd";
import type { ResultStatusType } from "antd/es/result";

type Props = {
  status: ResultStatusType;
  title: string;
  subTitle: string;
};

const ErrorPage = ({ status, title, subTitle }: Props) => {
  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default ErrorPage;
