// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn:", isLoggedIn); // Add this console log

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
