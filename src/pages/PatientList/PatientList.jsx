import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function PatientList() {
  const [patients, setPatients] = useState([]);

  const url = "api/patients";
  const navigate = useNavigate();

  const handleLinkToPatientId = (patientId) => {
    navigate(`/patients/${patientId}`);
  };

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
      {patients && (
        <div className="patientlist-display-infos">
          <div className="patientlist-infos">
            <div className="patientlist-infos-number">{patients.length}</div>
            <div>Nombre de patients</div>
          </div>
          <div className="patientlist-infos">
            <div className="patientlist-infos-number">{patients.length}</div>
            <div>Sans risque</div>
          </div>
          <div className="patientlist-infos">
            <div className="patientlist-infos-number">{patients.length}</div>
            <div>Risque limité</div>
          </div>
          <div className="patientlist-infos">
            <div className="patientlist-infos-number">{patients.length}</div>
            <div>En danger</div>
          </div>
          <div className="patientlist-infos">
            <div className="patientlist-infos-number">{patients.length}</div>
            <div>Apparition précoce</div>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th className="th-outer-right">Patient</th>
            <th>Dernière consultation</th>
            <th>Age</th>
            <th>Date de naissance </th>
            <th>Genre</th>
            <th>Status Check</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              className="tr-bg"
              key={patient.id}
              onClick={() => handleLinkToPatientId(patient.id)}
            >
              <td className="td-outer-left">
                {patient.prenom ?? ""} {patient.nom ?? ""}
              </td>
              <td className="td-inner">xxx</td>
              <td className="td-inner">age</td>
              <td className="td-inner">{patient.dateNaissance ?? ""}</td>
              {patient.genre == "M" ? (
                <td className="td-inner">Homme</td>
              ) : (
                <td className="td-inner">Femme</td>
              )}
              <td className="td-outer-right">Status</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
