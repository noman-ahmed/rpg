import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// Import the named exports from authService.js
import { login as loginService, fetchUserInfo } from "./AuthService"; // Adjust the path as necessary

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      // Attempt to load user info from localStorage on initial load
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Failed to parse "user" from localStorage:', error);
      return null;
    }
  });

  // Automatically set the Authorization header for axios requests if accessToken exists
  useEffect(() => {
    if (user?.accessToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.accessToken}`;
    }
  }, [user?.accessToken]);

  // Define the login function with error handling
  const login = async (username, password) => {
    try {
      const userData = await loginService(username, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error logging in:", error);
      // Here, you might want to update the state to show an error message to the user
      // For example: setError('Login failed. Please try again.');
    }
  };

  // Define the logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Reset the Authorization header for axios requests
    delete axios.defaults.headers.common["Authorization"];
  };

  // Define a function to fetch and update user info
  const updateUserInfo = async () => {
    if (!user?.accessToken) return; // Early return if no access token is available

    try {
      // Fetch user info using the accessToken
      const userInfo = await fetchUserInfo(user.accessToken);

      // Update the user state with the fetched information
      setUser((prevUser) => ({ ...prevUser, ...userInfo }));

      // Optionally update localStorage with the new user info
      localStorage.setItem("user", JSON.stringify({ ...user, ...userInfo }));
    } catch (error) {
      console.error("Error fetching user information:", error);
      // Handle errors appropriately, such as logging out the user if the token is invalid
    }
  };

  // Automatically fetch and update user info on app load and when the accessToken changes
  useEffect(() => {
    updateUserInfo();
  }, [user?.accessToken]);

  // The value provided to the context consumers
  const value = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
    updateUserInfo, // Expose the function to manually trigger a user info update if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
