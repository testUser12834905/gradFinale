import { openConnections } from ".";
import { SECOND } from "../../shared/consts/measurement";
import type { WebSocketMessage } from "../../shared/types/ws-message";
import { verifyAccessToken } from "../auth/verify-token";
import { requestRevalidation } from "./broadcast";

export const disconnetTimeout = (connectionId: string) => {
  const timeoutId = setTimeout(() => {
    const openConnection = openConnections.get(connectionId);

    if (openConnection?.authorized) {
      return;
    }

    openConnection?.connection.close();
    openConnections.delete(connectionId);
  }, 10 * SECOND);
  return timeoutId;
};

export const setRevalidateInterval = () => {
  setInterval(
    () => {
      requestRevalidation();
    },
    5 * 60 * SECOND,
  );
};

export const authenticateConnection = (
  message: WebSocketMessage,
  connectionId: string,
  timeoutId: Timer,
): boolean => {
  const openConnection = openConnections.get(connectionId);

  if (openConnection?.authorized) {
    return true;
  }

  if (message.type === "authorize") {
    const accessToken = message.bearerToken.split("Bearer ")[1];
    const isVerified = verifyAccessToken(accessToken);

    if (isVerified) {
      openConnections.set(connectionId, {
        connection: openConnection!.connection,
        authorized: true,
      });
      clearTimeout(timeoutId);
    }

    return isVerified;
  } else {
    openConnection?.connection.close();

    if (openConnection) {
      openConnections.delete(connectionId);
    }

    return false;
  }
};
