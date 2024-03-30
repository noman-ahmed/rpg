import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
