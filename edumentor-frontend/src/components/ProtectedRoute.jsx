import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no JWT token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Else, allow access
  return children;
};

export default ProtectedRoute;
