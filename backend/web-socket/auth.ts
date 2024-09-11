import { openConections } from ".";
import { SECOND } from "../../shared/consts/measurement";
import { requestRevalidation } from "./broadcast";

export const disconnetTimeout = (connectionId: string) => {
  const timeoutId = setTimeout(() => {
    const openConnection = openConections.get(connectionId);

    if (openConnection?.authorized) {
      return;
    }

    openConnection?.connection.close();
    openConections.delete(connectionId);
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
