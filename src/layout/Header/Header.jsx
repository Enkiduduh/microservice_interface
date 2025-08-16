import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../security/AuthProvider";
import logo_img from "../../../public/logo_mls.png";

function Header() {
  const { authed, logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/connexion"); // Redirection après déconnexion
  };

  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (authed) {
      handleLogout();
    } else {
      navigate("/connexion");
    }
  };

  return (
    <div className="header-container">
      <div className="header-logo">
        <Link className="header-logo-link" to="/">
          <img src={logo_img} alt="" className="header-logo-img" />
          <div>MediLabo Solutions</div>
        </Link>
      </div>
      <nav className="header-nav-links">
        <Link className="header-nav-link" to="/patients">
          Liste des patients
        </Link>
        <Link className="header-nav-link" to="/patients/add">
          Ajouter un patient
        </Link>

        <div className="header-nav-link" onClick={handleAuthAction}>
          {authed ? "Se déconnecter" : "Se connecter "}
        </div>
        {authed && user && (
          <div className="header-user-info">
            Connecté en tant que Docteur {user}
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
