import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute() {
  const { token } = useSelector((state) => state.auth);

  // Kalau belum ada token, redirect ke login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Kalau ada token, render route di dalamnya
  return <Outlet />;
}

export default PrivateRoute;
