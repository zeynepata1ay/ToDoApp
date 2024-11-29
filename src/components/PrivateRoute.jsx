import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Show a loading state while authentication status is being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the child component(s)
  return children;
}
