import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [isUpdateActive, setIsUpdateActive] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [naissance, setNaissance] = useState("");
  const [genre, setGenre] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    genre: "",
    adresse: "",
    telephone: "",
  });

  const ChangeFormInfo = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { id } = useParams();
  console.log({ id });
  const navigate = useNavigate();

  const url = `/api/patients/${id}`;

  useEffect(() => {
    if (patient) {
      const hasChanged =
        formData.nom !== (patient.nom ?? "") ||
        formData.prenom !== (patient.prenom ?? "") ||
        formData.dateNaissance !== (patient.dateNaissance ?? "") ||
        formData.genre !== (patient.genre ?? "") ||
        formData.adresse !== (patient.adresse ?? "") ||
        formData.telephone !== (patient.telephone ?? "");

      setIsFormValid(hasChanged);
    }
  }, [formData, patient]);

  useEffect(() => {
    const loadPatient = async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Not found");
      const data = await response.json();
      setPatient(data);

      // Initialiser formData avec les données du patient
      setFormData({
        nom: data.nom ?? "",
        prenom: data.prenom ?? "",
        dateNaissance: data.dateNaissance ?? "",
        genre: data.genre ?? "",
        adresse: data.adresse ?? "",
        telephone: data.telephone ?? "",
      });
    };

    loadPatient().catch(console.error);
  }, [url]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: Number(id),
      nom: formData.nom,
      prenom: formData.prenom,
      dateNaissance: formData.dateNaissance,
      genre: formData.genre, // "F" | "M"
      adresse: formData.adresse || null,
      telephone: formData.telephone || null,
    };

    const res = await fetch(`/api/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("PUT failed", res.status, err);
      return;
    }
    const updated = await res.json();
    setPatient(updated);
  };

  if (!patient) return <div>Chargement...</div>;

  const handleValidationForm = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(e);
  };

  const handleActiveUpdate = () => {
    setIsUpdateActive(true);
  };

  const handleValidForm = (e) => {
    e.preventDefault();
    setIsUpdateActive(false);
    handleValidationForm(e);
  };

  const handleCancelUpdate = () => {
    setIsUpdateActive(false);
  };

  const handleReturnToPatientsList = () => {
    navigate("/patients");
  };

  return (
    <>
      <div
        className="patientprofile-button-return"
        onClick={handleReturnToPatientsList}
      >
        Retour à la liste des patients
      </div>
      <div className="patientprofile-container">
        {isUpdateActive ? (
          <form className="patientprofile-lines-container">
            <div className="patientprofile-line">
              <label htmlFor="form-nom">
                Nom:
                <input
                  type="text"
                  id="form-nom"
                  name="nom"
                  placeholder={patient.nom ?? ""}
                  value={formData.nom}
                  onChange={ChangeFormInfo}
                />
              </label>
            </div>
            <div className="patientprofile-line">
              <label htmlFor="form-prenom">
                Prénom:
                <input
                  type="text"
                  id="form-prenom"
                  name="prenom"
                  value={formData.prenom}
                  placeholder={patient.prenom ?? ""}
                  onChange={ChangeFormInfo}
                />
              </label>
            </div>
            <div className="patientprofile-line">
              <label htmlFor="form-dateNaissance">
                Date de naissance:
                <input
                  type="date"
                  id="form-dateNaissance"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  defaultValue={patient.dateNaissance ?? ""}
                  onChange={ChangeFormInfo}
                />
              </label>
            </div>
            <div className="patientprofile-line">
              <label htmlFor="">
                Genre:
                <select
                  htmlFor="form-genre"
                  name="genre"
                  value={formData.genre}
                  placeholder={patient.genre ?? ""}
                  onChange={ChangeFormInfo}
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
                  name="adresse"
                  value={formData.adresse}
                  placeholder={patient.adresse ?? ""}
                  onChange={ChangeFormInfo}
                />
              </label>
            </div>
            <div className="patientprofile-line">
              <label htmlFor="form-telephone">
                Téléphone:
                <input
                  type="text"
                  id="form-telephone"
                  name="telephone"
                  value={formData.telephone}
                  placeholder={patient.telephone ?? ""}
                  onChange={ChangeFormInfo}
                />
              </label>
            </div>
          </form>
        ) : (
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
                className={`patientprofile-button patientprofile-button-validation ${
                  !isFormValid ? "disabled" : ""
                }`}
                onClick={isFormValid ? handleValidForm : undefined}
                style={{ cursor: isFormValid ? "pointer" : "not-allowed" }}
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
