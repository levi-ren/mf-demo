import { createContext, useContext } from "react";

export const GlobalContext = createContext({
  currency: "USD",
});

export const useGlobalContext = () => useContext(GlobalContext);
