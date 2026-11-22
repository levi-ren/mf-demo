import { createContext, PropsWithChildren, useContext, useState } from "react";

type Session = {
  id: number;
  token: string;
};

type AuthContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  customSession,
}: PropsWithChildren<{ customSession?: Session }>) => {
  const [session, setSession] = useState<Session | null>(customSession || null);

  return <AuthContext value={{ session, setSession }}>{children}</AuthContext>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
