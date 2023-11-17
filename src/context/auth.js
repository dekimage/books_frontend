// AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api/auth";
import Token from "@/app/utils/token";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = Token.get();
    if (token) {
      authApi
        .getUser()
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setAuthLoading(false);
        });
    }
  }, []);

  const signup = (userData) => {
    authApi
      .signup(userData)
      .then((res) => {
        setUser(res.user);
        Token.set(res.jwt);
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
    setAuthLoading(false);
  };

  const login = (userData) => {
    authApi
      .login(userData)
      .then((res) => {
        setUser(res.user);
        Token.set(res.jwt);
      })
      .catch((err) => {
        console.log(err);
      });
    setAuthLoading(false);
  };

  const logout = () => {
    setUser(null);
    Token.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
        error,
        authLoading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
