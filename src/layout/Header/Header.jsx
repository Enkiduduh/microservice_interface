import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLinkToPatientsList = () => {
    navigate("/patients");
  };

  const handleLinkToPatientCreation = () => {
    navigate("/patients/add");
  };

  const handleLinkToAccount = () => {
    navigate("/connexion");
  };

  const handleLinkToHome = () => {
    navigate("/");
  };
  return (
    <div className="header-container">
      <div className="header-logo" >
        <div className="header-logo-link" onClick={handleLinkToHome}>MediLabo Solutions</div>
      </div>
      <nav className="header-nav-links">
        <div className="header-nav-link" onClick={handleLinkToPatientsList}>
          Liste des patients
        </div>
        <div className="header-nav-link" onClick={handleLinkToPatientCreation}>
          Ajouter un patient
        </div>
        <div className="header-nav-link" onClick={handleLinkToAccount}>
          Se connecter
        </div>
      </nav>
    </div>
  );
}

export default Header;
