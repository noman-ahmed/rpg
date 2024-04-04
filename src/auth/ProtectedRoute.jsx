// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuthState } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthState();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
