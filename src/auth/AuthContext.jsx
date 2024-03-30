import React, { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser
        ? JSON.parse(savedUser)
        : { username: null, userId: null };
    } catch (error) {
      console.error('Failed to parse "user" from localStorage:', error);
      return { username: null, userId: null };
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // userData should include { username, userId }
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData)); // Ensure userData includes userId
    localStorage.setItem("token", userData.token); // Assuming token is also part of userData
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ username: null, userId: null });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
