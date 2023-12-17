import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  user: User | null;
}

export const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return <Outlet/>;
};
