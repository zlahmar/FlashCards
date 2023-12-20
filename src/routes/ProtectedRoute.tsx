import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  user: User | null;
}

export const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  const userLocal = localStorage.getItem("@user");
  userLocal && console.log(JSON.parse(userLocal));
  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return <Outlet />;
};
