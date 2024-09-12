import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  loading: boolean;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const initialContextValue: AuthContextType = {
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  loading: true,
  logout: () => {},
  refreshAccessToken: async () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = 'http://localhost:8000';

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return;

    try {
      const response = await fetch(`${apiUrl}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data : any = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Failed to refresh access token", error);
      handleLogout();
    }
  }, [refreshToken]);



  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
  };
  
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (accessToken) {
      const { exp } = jwtDecode<{ exp: number }>(accessToken);
      const expiresIn = exp * 1000 - Date.now() - 5000;
      const timeoutId = setTimeout(refreshAccessToken, expiresIn);

      return () => clearTimeout(timeoutId);
    }
  }, [accessToken, refreshAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        loading,
        logout: handleLogout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
