export type ChatMessage = {
  id: string | undefined;
  userID: string;
  content: string;
  timestamp: number;
  User: { username: string };
};
