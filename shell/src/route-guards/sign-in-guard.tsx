import { RoutePaths, useIsAuthenticated } from "@mf-demo/shared";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

type SignInGuardProps = PropsWithChildren;

export const SignInGuard = ({ children }: SignInGuardProps) => {
  const auth = useIsAuthenticated();

  if (auth) {
    return <Navigate to={RoutePaths.Home} replace />;
  }

  return children;
};
