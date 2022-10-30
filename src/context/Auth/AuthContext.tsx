import { createContext, useContext } from "react";

export type ISetUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
};

interface ContextProps {
  isLoggedIn: boolean;
  user?: ISetUser;
  // loginUser: (email: string, password: string) => Promise<boolean>;
  setAuthUser: ({ id, name, email, role, token }: ISetUser) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("Error deploying Auth Context!!!");
  }

  return context;
}
