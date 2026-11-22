import { RoutePaths } from "@mf-demo/shared";
import { Route, Routes } from "react-router";
import Cart from "./cart";
import Home from "./home";
import { HeadlessLayout, Layout } from "./layout";
import SignIn from "./sign-in";

function App() {
  return (
    <Routes>
      <Route path={RoutePaths.Home} Component={Layout}>
        <Route index Component={Home} />
        <Route path={RoutePaths.Cart} Component={Cart} />
      </Route>
      <Route Component={HeadlessLayout}>
        <Route path={RoutePaths.SignIn} Component={SignIn} />
      </Route>
    </Routes>
  );
}

export default App;
