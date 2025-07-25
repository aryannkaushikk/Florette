import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/signIn" replace />;

  return children;
}
