import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PatientCreation() {
  const [patient, setPatient] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    genre: "",
    adresse: null,
    telephone: null,
  });

  const ChangeFormInfo = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nom: formData.nom,
      prenom: formData.prenom,
      dateNaissance: formData.dateNaissance,
      genre: formData.genre, // "F" | "M"
      adresse: formData.adresse || null,
      telephone: formData.telephone || null,
    };

    const res = await fetch(`/api/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("POST failed", res.status, err);
      window.alert("Erreur, impossible de créer la fiche du patient.");
      return;
    } else {
      window.alert("Patient créée avec succès. Retour à la liste des patients");
      navigate("/patients");
    }
    const newPatient = await res.json();
    setPatient(newPatient);
  };

  const handleValidForm = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="patientprofile-container">
      <form className="patientprofile-lines-container">
        <div className="patientprofile-line">
          <label htmlFor="form-nom">
            Nom:*
            <input
              type="text"
              id="form-nom"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={ChangeFormInfo}
            />
          </label>
        </div>
        <div className="patientprofile-line">
          <label htmlFor="form-prenom">
            Prénom:*
            <input
              type="text"
              id="form-prenom"
              name="prenom"
              value={formData.prenom}
              placeholder="Prénom"
              onChange={ChangeFormInfo}
            />
          </label>
        </div>
        <div className="patientprofile-line">
          <label htmlFor="form-dateNaissance">
            Date de naissance:*
            <input
              type="date"
              id="form-dateNaissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={ChangeFormInfo}
            />
          </label>
        </div>
        <div className="patientprofile-line">
          <label htmlFor="">
            Genre:*
            <select
              htmlFor="form-genre"
              name="genre"
              value={formData.genre}
              onChange={ChangeFormInfo}
            >
              <option>Genre</option>
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
              placeholder="Adresse"
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
              placeholder="Téléphone"
              onChange={ChangeFormInfo}
            />
          </label>
        </div>
        <div className="patientcreation-button" onClick={handleValidForm}>
          Créer le patient
        </div>
      </form>
      <div>* Champs obligatoires</div>
    </div>
  );
}

export default PatientCreation;
