import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      
      const authToken =
        localStorage.getItem("boolbieToken") ||
        sessionStorage.getItem("boolbieToken");

      if (!authToken) {
        toast.error("You are not authorized to access this. Please login first.");
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(authToken);
        const { role } = decodedToken;

        if (!role || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
          toast.error("Access denied. Insufficient permissions.");
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        toast.error("Invalid token. Please login again.");
        localStorage.removeItem("boolbieToken");
        sessionStorage.removeItem("boolbieToken");
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // If still loading, show nothing to prevent content flash
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return children;
};

export default PrivateRoute;
