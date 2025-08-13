// RequireAuth.jsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const [status, setStatus] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!cancelled) setStatus(res.ok ? "authed" : "guest"); // <-- pas de res.json() ici
      } catch {
        if (!cancelled) setStatus("guest");
      }
    })();
    return () => { cancelled = true; };
  }, [location.pathname]);

  if (status === "loading") return null; // ou un spinner
  if (status === "guest") return <Navigate to="/connexion" replace state={{ from: location }} />;
  return children;
}
