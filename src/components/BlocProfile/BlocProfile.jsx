import React from "react";

function BlocProfile({ patient_data }) {
  return (
    <div className="patientprofile-lines-container">
      <div className="patientprofile-line">
        <div className="patientprofile-line-label">
          Nom:
          <div className="patientprofile-line-data">
            {patient_data.nom ?? ""}
          </div>
        </div>
      </div>
      <div className="patientprofile-line">
        <div className="patientprofile-line-label">
          Prénom:
          <div className="patientprofile-line-data">
            {patient_data.prenom ?? ""}
          </div>
        </div>
      </div>

      <div className="patientprofile-line">
        <div className="patientprofile-line-label">
          Date de naissance:
          <div className="patientprofile-line-data">
            {patient_data.dateNaissance ?? ""}
          </div>
        </div>
      </div>

      <div className="patientprofile-line">
        {patient_data.genre == "M" ? (
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
            {patient_data.adresse ?? ""}
          </div>
        </div>
      </div>

      <div className="patientprofile-line">
        <div className="patientprofile-line-label">
          Téléphone:
          <div className="patientprofile-line-data">
            {patient_data.telephone ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocProfile;
