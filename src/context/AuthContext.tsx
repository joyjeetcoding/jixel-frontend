import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthContextType {
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const AuthContext = createContext<AuthContextType>({
  authUser: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  setAuthUser: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("registered-user") as string) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
