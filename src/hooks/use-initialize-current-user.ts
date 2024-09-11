import { useEffect } from "react";
import { useCurrentUserStore } from "../lib/state/current-user";

export default function useInitializeCurrentUser() {
  const initializeStore = useCurrentUserStore((state) => state.initializeStore);
  const isLoading = useCurrentUserStore((state) => state.isLoading);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return isLoading;
}
