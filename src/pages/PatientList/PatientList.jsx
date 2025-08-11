import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function PatientList() {
  const [patients, setPatients] = useState([]);

  const url = "api/patients";

  useEffect(() => {
    const loadPatients = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setPatients(data);
    };

    loadPatients();
  }, [url]);

  return (
    <div className="patientlist-container">
      {patients.map((p) => (
        <form key={p.id} className="patientlist-lines-container">
          <div className="patientlist-line">
            <label htmlFor="form-nom">
              Nom:
              <input type="text" id="form-nom" value={p.nom} />
            </label>
          </div>
          <div className="patientlist-line">
            <label htmlFor="form-prenom">
              Prénom:
              <input type="text" id="form-prenom" value={p.prenom} />
            </label>
          </div>
          <div className="patientlist-line">
            <label htmlFor="form-dateNaissance">
              Date de naissance:
              <input
                type="text"
                id="form-dateNaissance"
                value={p.dateNaissance}
              />
            </label>
          </div>
          <div className="patientlist-line">
            <label htmlFor="">Genre:
              <select htmlFor="form-genre" value={p.genre}>
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </select>
            </label>
          </div>
          <div className="patientlist-line">
            <label htmlFor="form-adresse">
              Adresse:
              <input type="text" id="form-adresse" value={p.adresse} />
            </label>
          </div>
          <div className="patientlist-line">
            <label htmlFor="form-telephone">
              Téléphone:
              <input type="text" id="form-telephone" value={p.telephone} />
            </label>
          </div>
        </form>
      ))}
    </div>
  );
}

export default PatientList;
