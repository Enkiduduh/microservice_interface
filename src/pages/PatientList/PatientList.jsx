import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function PatientList() {
  const [patients, setPatients] = useState([]);
  const [prevoyances, setPrevoyances] = useState({}); // Objet avec patientId comme clé
  const [notes, setNotes] = useState({});
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

  // Charger la prévoyance pour chaque patient
  useEffect(() => {
    if (patients.length === 0) return;

    const loadPrevoyancesForAllPatients = async () => {
      const prevoyancePromises = patients.map(async (patient) => {
        try {
          const urlPrevoyance = `/api/prevoyance/patient/${patient.id}/risk`;
          const res = await fetch(urlPrevoyance, {
            credentials: "include",
          });

          if (!res.ok) {
            console.error(
              `Prévoyance failed for patient ${patient.id}`,
              res.status
            );
            return { patientId: patient.id, data: null };
          }

          const data = await res.json();
          return { patientId: patient.id, data };
        } catch (error) {
          console.error(`Erreur prévoyance pour patient ${patient.id}:`, error);
          return { patientId: patient.id, data: null };
        }
      });

      const results = await Promise.all(prevoyancePromises);

      // Convertir en objet avec patientId comme clé
      const prevoyancesByPatient = {};
      results.forEach(({ patientId, data }) => {
        prevoyancesByPatient[patientId] = data;
      });

      setPrevoyances(prevoyancesByPatient);
    };

    loadPrevoyancesForAllPatients();
  }, [patients]);

  // Charger la prévoyance pour chaque patient
  useEffect(() => {
    if (patients.length === 0) return;

    const loadNotesForAllPatients = async () => {
      const notePromises = patients.map(async (patient) => {
        try {
          const urlNotes = `/api/notes/${patient.id}`;
          const res = await fetch(urlNotes, {
            credentials: "include",
          });

          if (!res.ok) {
            console.error(
              `Notes failed for patient ${patient.id}`,
              res.status
            );
            return { patientId: patient.id, data: null };
          }

          const data = await res.json();
          console.log(data)
          return { patientId: patient.id, data };
        } catch (error) {
          console.error(`Erreur Notes pour patient ${patient.id}:`, error);
          return { patientId: patient.id, data: null };
        }
      });

      const results = await Promise.all(notePromises);

      // Convertir en objet avec patientId comme clé
      const notesByPatient = {};
      results.forEach(({ patientId, data }) => {
        notesByPatient[patientId] = data;
      });

      setNotes(notesByPatient);
    };

    loadNotesForAllPatients();
  }, [patients]);

  // Fonction pour obtenir la date de la dernière note
const getLastNoteDate = (notesArray) => {
  if (!notesArray || notesArray.length === 0) return "Aucune";

  // Trier les notes par date de création (plus récente en premier)
  const sortedNotes = [...notesArray].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const lastNote = sortedNotes[0];
  const date = new Date(lastNote.createdAt);

  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

  // Fonction pour obtenir le statut en français
  const getStatusLabel = (code) => {
    switch (code) {
      case "NONE":
        return "Aucun risque";
      case "BORDERLINE":
        return "Risque limité";
      case "IN_DANGER":
        return "Danger";
      case "EARLY_ONSET":
        return "Apparition précoce";
      default:
        return "Non évalué";
    }
  };

  // Calculer les statistiques
  const getStats = () => {
    const stats = {
      total: patients.length,
      aucunRisque: 0,
      risqueLimite: 0,
      danger: 0,
      apparitionPrecoce: 0,
    };

    Object.values(prevoyances).forEach((prevoyance) => {
      if (!prevoyance) return;

      switch (prevoyance.code) {
        case "NONE":
          stats.aucunRisque++;
          break;
        case "BORDERLINE":
          stats.risqueLimite++;
          break;
        case "IN_DANGER":
          stats.danger++;
          break;
        case "EARLY_ONSET":
          stats.apparitionPrecoce++;
          break;
      }
    });

    return stats;
  };

  const stats = getStats();

  return (
    <div className="patientlist-container">
      <div className="patientlist-display-infos">
        <div className="patientlist-infos">
          <div className="patientlist-infos-number">{stats.total}</div>
          <div>Nombre de patients</div>
        </div>
        <div className="patientlist-infos">
          <div className="patientlist-infos-number">{stats.aucunRisque}</div>
          <div>Sans risque</div>
        </div>
        <div className="patientlist-infos">
          <div className="patientlist-infos-number">{stats.risqueLimite}</div>
          <div>Risque limité</div>
        </div>
        <div className="patientlist-infos">
          <div className="patientlist-infos-number">{stats.danger}</div>
          <div>En danger</div>
        </div>
        <div className="patientlist-infos">
          <div className="patientlist-infos-number">
            {stats.apparitionPrecoce}
          </div>
          <div>Apparition précoce</div>
        </div>
      </div>

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
          {patients.map((patient) => {
            const prevoyance = prevoyances[patient.id];
            const note = notes[patient.id];

            return (
              <tr
                className="tr-bg"
                key={patient.id}
                onClick={() => handleLinkToPatientId(patient.id)}
              >
                <td className="td-outer-left">
                  {patient.prenom ?? ""} {patient.nom ?? ""}
                </td>
                <td className="td-inner">{getLastNoteDate(note)}</td>
                <td className="td-inner">{prevoyance?.age ?? "N/A"}</td>
                <td className="td-inner">{patient.dateNaissance ?? ""}</td>
                <td className="td-inner">
                  {patient.genre === "M" ? "Homme" : "Femme"}
                </td>
                <td className="td-outer-right">
                  {prevoyance
                    ? getStatusLabel(prevoyance.code)
                    : "Chargement..."}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PatientList;
