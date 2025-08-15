import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/AuthProvider";

function Connexion() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const ChangeFormInfo = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const url = `/api/connexion`;

  const loginUser = async (e) => {
    e?.preventDefault?.();

    const body = new URLSearchParams();
    body.append("username", formData.username); // email ou username
    body.append("password", formData.password);
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
        credentials: "include",
      });

      if (!response.ok) {
        const err = await response
          .json()
          .catch(() => ({ message: "Erreur de connexion" }));
        console.error("POST failed", response.status, err);
        setError("Identifiant ou mot de passe incorrect.")
        return;
      }

      const feedback = await response.json();
      console.log("connexion reussie:", feedback);

      console.log("Connexion réussie:", feedback);

      // Mettre à jour le contexte d'authentification
      login(feedback.user || { username: formData.username });

      navigate("/patients");
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  return (
    <div className="connexion-container">
      <h1 className="connexion-title">Interface de connexion des médecins</h1>
      <form className="connexion-lines-container">
        <div className="connexion-line">
          <label htmlFor="form-username">
            Username:
            <input
              type="text"
              id="form-username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={ChangeFormInfo}
            />
          </label>
        </div>
        <div className="connexion-line">
          <label htmlFor="form-password">
            Password:
            <input
              type="password"
              id="form-password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={ChangeFormInfo}
            />
          </label>
        </div>
        <div className="connexion-error">{error}</div>
        <button type="submit" className="connexion-button " onClick={loginUser}>
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Connexion;
