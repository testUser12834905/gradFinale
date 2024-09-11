import MainLayout from "./components/templates/main-layout";
import useInitializeCurrentUser from "./hooks/use-initialize-current-user";
import Router from "./lib/router";

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
