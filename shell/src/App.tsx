import { RoutePaths } from "@mf-demo/shared";
import { Route, Routes } from "react-router";
import Cart from "./cart";
import Home from "./home";
import SignIn from "./sign-in";

function App() {
  return (
    <Routes>
      <Route path={RoutePaths.Home} Component={Home} />
      <Route path={RoutePaths.SignIn} Component={SignIn} />
      <Route path={RoutePaths.Cart} Component={Cart} />
    </Routes>
  );
}

export default App;
