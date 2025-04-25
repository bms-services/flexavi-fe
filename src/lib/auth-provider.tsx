// src/hooks/useAuth.jsx

import { tokenName, useCookies } from "@/hooks/use-cookies";
import { createContext, ReactNode, useContext, useMemo } from "react";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  token: string | null;
  setToken: (value: string | null) => void;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useCookies(tokenName, null);

  const value = useMemo(
    () => ({
      token: token as string | null,
      setToken,
    }),
    [token]
  );


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
