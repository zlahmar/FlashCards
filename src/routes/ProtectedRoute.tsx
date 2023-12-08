import { User } from "firebase/auth";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: User | null;
  children: ReactNode;
}

export const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
};
