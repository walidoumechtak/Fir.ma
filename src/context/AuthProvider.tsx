'use client';

import React,{
  createContext,
  ReactNode,
  useEffect,
  useState
} from "react";
import { useUserStore } from "../hooks/use-current-user";
import { User } from "../types/User";


export interface AuthContextType {
  user: User | undefined;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser = useUserStore((state) => state.user)
  const [user, setUser] = useState<User | undefined>(currentUser)
  const [token, setToken] = useState<string | null>("")

  useEffect(() => {
    setUser(currentUser)
    setToken(token)
  }, [currentUser, token])

  return (
      <AuthContext.Provider value={{user, token, setToken, setUser}}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;
