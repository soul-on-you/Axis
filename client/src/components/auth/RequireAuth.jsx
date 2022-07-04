import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { selectAccessToken } from "../../store/slices/AuthSlice";

function RequireAuth() {
  const location = useLocation();

  const token = useSelector(selectAccessToken);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
