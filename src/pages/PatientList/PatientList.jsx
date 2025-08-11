import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
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
      {patients.map((patient) => (
        <div className="patientlist-lines-container" key={patient.id}>
          <div>
            <div className="patientlist-line">
              <div className="patientlist-line-label">
                Nom:
                <div className="patientlist-line-data">{patient.nom ?? ""}</div>
              </div>
              <div className="patientlist-line-label">
                Prénom:
                <div className="patientlist-line-data">
                  {patient.prenom ?? ""}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="patientlist-line">
              <div className="patientlist-line-label">
                Date de naissance:
                <div className="patientlist-line-data">
                  {patient.dateNaissance ?? ""}
                </div>
              </div>
              {patient.genre == "M" ? (
                <div className="patientlist-line-label">
                  Genre:
                  <div className="patientlist-line-data">Homme</div>
                </div>
              ) : (
                <div className="patientlist-line-label">
                  Genre:
                  <div className="patientlist-line-data">Femme</div>
                </div>
              )}
            </div>
          </div>
          <Link className="patientlist-button" to={`/patients/${patient.id}`}>
            Consulter la fiche du patient
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PatientList;
