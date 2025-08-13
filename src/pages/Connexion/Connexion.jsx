import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Connexion() {
  const [patient, setPatient] = useState(null);
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

  const login = async () => {
    const body = new URLSearchParams();
    body.append("identifier", formData.username); // email ou username
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
        return;
      }

      const feedback = await response.json();
      console.log(feedback);
      navigate("/patients");
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  return (
    <div className="connexion-container">
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
        <div className="connexion-button " onClick={login}>
          Se connecter
        </div>
      </form>
    </div>
  );
}

export default Connexion;
