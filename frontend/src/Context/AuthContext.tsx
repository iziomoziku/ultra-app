import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
    user: { username: string } | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        await axios.post("http://localhost:5001/api/Auth/login", { username, password });
        // const response = await axios.post("http://localhost:5001/api/Auth/login", { username, password });
        // const token = response.data.token;

        // setToken(token);
        // setUser({ username });
        // localStorage.setItem("token", token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
