import { useEffect } from "react";
import MainLayout from "./components/templates/main-layout";
import Router from "./lib/router";
import { useCurrentUserStore } from "./lib/state/current-user";

export function useInitializeCurrentUser() {
  const initializeStore = useCurrentUserStore((state) => state.initializeStore);
  const isLoading = useCurrentUserStore((state) => state.isLoading);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return isLoading;
}
const App = () => {
  const isLoading = useInitializeCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
};

export default App;
