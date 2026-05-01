/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showNotification } = useNotification();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("cinema_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(
    (userData) => {
      setUser(userData);
      localStorage.setItem("cinema_user", JSON.stringify(userData));
      showNotification(`Welcome back, ${userData.name}!`, "success");
    },
    [showNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("cinema_user");
    showNotification("You've been signed out safely.", "info");
  }, [showNotification]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
