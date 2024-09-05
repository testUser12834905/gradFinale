import { Avatar, Flex, theme, Typography } from "antd";
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
    marginTop: 20,
    flexDirection: isCurrentUser ? "row-reverse" : "row",
  };

  return (
    <Flex align={"flex-start"} flex={""} style={containerStyle} gap={8}>
      <Avatar
        src={avatar}
        alt={isCurrentUser ? "User Avatar" : "Other Avatar"}
        style={{
          flex: "none",
        }}
      />
      <Flex
        align={isCurrentUser ? "end" : "start"}
        // style={{ maxWidth: "100%" }}
        vertical
      >
        <Text strong style={{ marginLeft: 2, marginRight: 2 }}>
          {isCurrentUser ? "You" : "Other"}
        </Text>
        <div style={bubbleStyle}>
          <Text>{content}</Text>
        </div>
      </Flex>
    </Flex>
  );
};

export default ChatBubble;
