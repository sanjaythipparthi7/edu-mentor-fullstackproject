import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/authHelper";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getUserRole();

  // if role not allowed -> redirect
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
