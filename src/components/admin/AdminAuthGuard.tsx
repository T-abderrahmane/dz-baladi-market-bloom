
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminAuthGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("adminAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);
  
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-baladi-terracotta border-t-transparent"></div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/admin/signin" state={{ from: location }} replace />;
  }
  
  // If authenticated, render child routes
  return <Outlet />;
};

export default AdminAuthGuard;
