/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    authed: false,
    user: null,
  });
  const location = useLocation();

  const refresh = async () => {
    try {
      console.log("Vérification de l'authentification..."); // Debug
      const res = await fetch("/api/me", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Utilisateur authentifié:", data); // Debug
        setState({
          loading: false,
          authed: true,
          user: data.user ?? null
        });
      } else {
        console.log("Non authentifié, status:", res.status); // Debug
        setState({ loading: false, authed: false, user: null });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification auth:", error); // Debug
      setState({ loading: false, authed: false, user: null });
    }
  };

  const logout = async () => {
    try {
      console.log("Tentative de déconnexion..."); // Debug
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("Déconnexion, status:", res.status); // Debug
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setState({ loading: false, authed: false, user: null });
    }
  };

  const login = async (userData) => {
    setState({ loading: false, authed: true, user: userData });
  };

  useEffect(() => {
    refresh();
  }, [location.pathname]);

  const value = useMemo(
    () => ({ ...state, refresh, logout, login, setState }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
