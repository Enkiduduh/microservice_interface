import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [isUpdateActive, setIsUpdateActive] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [naissance, setNaissance] = useState("");
  const [genre, setGenre] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");

  // Modifier les handlers pour stocker les valeurs
  const handleNomChange = (e) => {
    setNom(e.target.value);
    console.log(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleNaissanceChange = (e) => {
    setNaissance(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const { id } = useParams();
  console.log({ id });
  const navigate = useNavigate();

  const url = `/api/patients/${id}`;

  useEffect(() => {
    const loadPatient = async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Not found");
      const data = await response.json();
      setPatient(data);
    };

    loadPatient().catch(console.error);
  }, [url]);

  if (!patient) return <div>Chargement...</div>;

  const handleActiveUpdate = () => {
    setIsUpdateActive(true);
  };

  const handleCancelUpdate = () => {
    setIsUpdateActive(false);
  };

  const handleReturnToPatientsList = () => {
    navigate("/patients");
  };

  return (
    <>
    <div className="patientprofile-button-return" onClick={handleReturnToPatientsList}>Retour à la liste des patients</div>
    <div className="patientprofile-container">
      {patient && isUpdateActive && (
        <form className="patientprofile-lines-container">
          <div className="patientprofile-line">
            <label htmlFor="form-nom">
              Nom:
              <input
                type="text"
                id="form-nom"
                placeholder={patient.nom ?? ""}
                onChange={(e) => handleNomChange(e)}
              />
            </label>
          </div>
          <div className="patientprofile-line">
            <label htmlFor="form-prenom">
              Prénom:
              <input
                type="text"
                id="form-prenom"
                placeholder={patient.prenom ?? ""}
                onChange={(e) => handlePrenomChange(e)}
              />
            </label>
          </div>
          <div className="patientprofile-line">
            <label htmlFor="form-dateNaissance">
              Date de naissance:
              <input
                type="date"
                id="form-dateNaissance"
                defaultValue={patient.dateNaissance ?? ""}
                onChange={(e) => handleNaissanceChange(e)}
              />
            </label>
          </div>
          <div className="patientprofile-line">
            <label htmlFor="">
              Genre:
              <select
                htmlFor="form-genre"
                placeholder={patient.genre ?? ""}
                onChange={(e) => handleGenreChange(e)}
              >
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </select>
            </label>
          </div>
          <div className="patientprofile-line">
            <label htmlFor="form-adresse">
              Adresse:
              <input
                type="text"
                id="form-adresse"
                placeholder={patient.adresse ?? ""}
                onChange={(e) => handleAdresseChange(e)}
              />
            </label>
          </div>
          <div className="patientprofile-line">
            <label htmlFor="form-telephone">
              Téléphone:
              <input
                type="text"
                id="form-telephone"
                placeholder={patient.telephone ?? ""}
                onChange={(e) => handleTelephoneChange(e)}
              />
            </label>
          </div>
        </form>
      )}
      {patient && !isUpdateActive && (
        <div className="patientprofile-lines-container">
          <div className="patientprofile-line">
            <div className="patientprofile-line-label">
              Nom:
              <div className="patientprofile-line-data">
                {patient.nom ?? ""}
              </div>
            </div>
          </div>
          <div className="patientprofile-line">
            <div className="patientprofile-line-label">
              Prénom:
              <div className="patientprofile-line-data">
                {patient.prenom ?? ""}
              </div>
            </div>
          </div>

          <div className="patientprofile-line">
            <div className="patientprofile-line-label">
              Date de naissance:
              <div className="patientprofile-line-data">
                {patient.dateNaissance ?? ""}
              </div>
            </div>
          </div>

          <div className="patientprofile-line">
            {patient.genre == "M" ? (
              <div className="patientprofile-line-label">
                Genre:
                <div className="patientprofile-line-data">Homme</div>
              </div>
            ) : (
              <div className="patientprofile-line-label">
                Genre:
                <div className="patientprofile-line-data">Femme</div>
              </div>
            )}
          </div>

          <div className="patientprofile-line">
            <div className="patientprofile-line-label">
              Adresse:
              <div className="patientprofile-line-data">
                {patient.adresse ?? ""}
              </div>
            </div>
          </div>

          <div className="patientprofile-line">
            <div className="patientprofile-line-label">
              Téléphone:
              <div className="patientprofile-line-data">
                {patient.telephone ?? ""}
              </div>
            </div>
          </div>
        </div>
      )}
      {!isUpdateActive && (
        <div className="patientprofile-lines-container">
          <div
            className="patientprofile-button patientprofile-button-large"
            onClick={handleActiveUpdate}
          >
            Mettre à jour le profil du patient
          </div>
        </div>
      )}
      {isUpdateActive && (
        <div className="patientprofile-lines-container">
          <div className="patientprofile-buttons-container">
            <div
              className="patientprofile-button patientprofile-button-validation"
              onClick={handleCancelUpdate}
            >
              Valider
            </div>
            <div
              className="patientprofile-button patientprofile-button-cancel"
              onClick={handleCancelUpdate}
            >
              Annuler
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default PatientProfile;
