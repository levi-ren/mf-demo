import { RoutePaths } from "@mf-demo/shared";
import { Route, Routes } from "react-router";
import Home from "./home";
import SignIn from "./sign-in";

function App() {
  return (
    <Routes>
      <Route path={RoutePaths.Home} Component={Home} />
      <Route path={RoutePaths.SignIn} Component={SignIn} />
    </Routes>
  );
}

export default App;
