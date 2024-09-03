import { Avatar, Flex, Space, theme, Typography } from "antd";
import type { CSSProperties } from "react";

const { Text } = Typography;

type Props = {
  content: string;
  isMe: boolean;
  avatar: string;
};

const { useToken } = theme;

const ChatBubble = ({ content, isMe, avatar }: Props) => {
  const { token } = useToken();

  const bubbleStyle: CSSProperties = {
    backgroundColor: isMe ? token.colorPrimaryBg : token.colorFillSecondary,
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "70%",
    alignSelf: isMe ? "flex-end" : "flex-start",
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isMe ? "row-reverse" : "row",
    alignItems: "flex-start",
    marginBottom: "16px",
  };

  return (
    <div style={containerStyle}>
      <Avatar
        src={avatar}
        alt={isMe ? "User Avatar" : "Other Avatar"}
        style={{ marginRight: isMe ? 0 : 8, marginLeft: isMe ? 8 : 0 }}
      />
      <Flex
        align={isMe ? "end" : "start"}
        style={{ maxWidth: "100%" }}
        vertical
      >
        <Text strong>{isMe ? "You" : "Other"}</Text>
        <div style={bubbleStyle}>
          <Text>{content}</Text>
        </div>
      </Flex>
    </div>
  );
};

export default ChatBubble;
