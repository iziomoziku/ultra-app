import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: { username: string } | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean; // New state for loading
}

interface LoginResponse {
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/login`,
        { username, password }
      );
      console.log(response);
      const token = response.data.token;
      const decodedToken = jwtDecode<{ exp: number }>(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token is expired");
      }

      setToken(token);
      setUser({ username });
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        setToken(token);
        setUser({ username });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        logout();
      }
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
