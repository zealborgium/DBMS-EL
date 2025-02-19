import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Props: Children component & allowed roles
interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; // Array of roles allowed to access the route
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);

  // Handle case where AuthContext is not available
  if (!auth) {
    throw new Error(
      "AuthContext is not available. Make sure it's wrapped in AuthProvider."
    );
  }

  // If no user is logged in, redirect to login page
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  // If the user's role is not allowed, redirect to unauthorized page
  if (!allowedRoles.includes(auth.user.role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is authorized, render the protected children component
  return children;
};

export default ProtectedRoute;
