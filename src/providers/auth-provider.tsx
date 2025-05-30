import { AuthContext } from "@/hooks/use-auth";
import { useCookies } from "@/hooks/use-cookies";
import { ReactNode, useMemo } from "react";

export type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  token: string | null;
  setToken: (value: string | null) => void;
};


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useCookies(import.meta.env.VITE_TOKEN_NAME, null);

  const value = useMemo(
    () => ({
      token: token as string | null,
      setToken,
    }),
    [token, setToken]
  );


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
