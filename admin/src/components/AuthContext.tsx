import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loading: boolean;
  logout: () => void;
}

const initialContextValue: AuthContextType = {
  token: null,
  setToken: () => {},
  loading: true,
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, loading, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
