import { Avatar, Flex, Space, theme, Typography } from "antd";
import type { CSSProperties } from "react";

const { Text } = Typography;

type Props = {
  content: string;
  isCurrentUser: boolean;
  avatar: string;
};

const { useToken } = theme;

const ChatBubble = ({ content, isCurrentUser, avatar }: Props) => {
  const { token } = useToken();

  const bubbleStyle: CSSProperties = {
    backgroundColor: isCurrentUser
      ? token.colorPrimaryBg
      : token.colorFillSecondary,
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "70%",
    alignSelf: isCurrentUser ? "flex-end" : "flex-start",
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isCurrentUser ? "row-reverse" : "row",
    alignItems: "flex-start",
    marginBottom: "16px",
  };

  return (
    <div style={containerStyle}>
      <Avatar
        src={avatar}
        alt={isCurrentUser ? "User Avatar" : "Other Avatar"}
        style={{
          marginRight: isCurrentUser ? 0 : 8,
          marginLeft: isCurrentUser ? 8 : 0,
        }}
      />
      <Flex
        align={isCurrentUser ? "end" : "start"}
        style={{ maxWidth: "100%" }}
        vertical
      >
        <Text strong>{isCurrentUser ? "You" : "Other"}</Text>
        <div style={bubbleStyle}>
          <Text>{content}</Text>
        </div>
      </Flex>
    </div>
  );
};

export default ChatBubble;
