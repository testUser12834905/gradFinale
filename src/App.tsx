import MainLayout from "./components/templates/main-layout";
import Router from "./lib/router";

const App = () => {
  return (
    <MainLayout>
      <Router />
    </MainLayout>
  );
};

export default App;
