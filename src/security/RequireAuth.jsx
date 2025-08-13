import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
  const { loading, authed } = useAuth();
  const location = useLocation();

  if (loading) return null; // ou un spinner
  if (!authed) return <Navigate to="/connexion" replace state={{ from: location }} />;
  return children;
}
