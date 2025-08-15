import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { DateNormalisation } from "../../components/logic/logic";
import FormProfile from "../../components/FormProfile/FormProfile";
import BlocProfile from "../../components/BlocProfile/BlocProfile";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [notes, setNotes] = useState(null);
  const [prevoyance, setPrevoyance] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusColor, setStatusColor] = useState(null);

  const [isKeywordsActive, setIsKeywordsActive] = useState(false);

  const [isUpdateActive, setIsUpdateActive] = useState(false);
  const [isDeletedActive, setIsDeletedActive] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [naissance, setNaissance] = useState("");
  const [genre, setGenre] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");

  const { id } = useParams();
  console.log({ id });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    genre: "",
    adresse: "",
    telephone: "",
  });

  const [noteData, setNoteData] = useState({
    patientId: id,
    content: "",
  });

  const ChangeFormInfo = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const url = `/api/patients/${id}`;
  const urlNotes = `/api/notes/${id}`;
  const urlAddNotes = `/api/notes`;
  const urlPrevoyance = `/api/prevoyance/patient/${id}/risk`;

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

  const loadNotesPatient = async () => {
    try {
      const res = await fetch(urlNotes, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Notes not found");
      const data = await res.json();
      console.log(data);
      setNotes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des notes:", error);
    }
  };

  useEffect(() => {
    loadNotesPatient();
  }, [urlNotes]);

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

  const onSubmitDelete = async (e) => {
    const confirm = window.confirm(
      "Etes-vous sûr de vouloir supprimer la fiche du patient ?"
    );
    if (confirm) {
      const res = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("DELETE failed", res.status, err);
        return;
      }
    }
    window.alert(
      "La fiche du patient a bien été éffacée. Retour à la liste des patients."
    );
    navigate("/patients");
  };

  useEffect(() => {
    const riskEngine = async () => {
      try {
        const res = await fetch(urlPrevoyance, {
          credentials: "include",
        });
        const data = await res.json(); // {status, matchedCount, matchedKeywords}
        setPrevoyance(data);
        switch (data.status) {
          case "none":
            setStatus("Aucun risque");
            setStatusColor("green");
            break;
          case "early":
            setStatus("Risque limité");
            setStatusColor("yellow");
            break;
          case "inDanger":
            setStatus("Danger");
            setStatusColor("darkorange");
            break;
          case "EarlyOnset":
            setStatus("Apparition précoce");
            setStatusColor("darkred");
            break;
        }
        if (!res.ok) {
          console.error("GET failed", res.status, data);
          window.alert(
            "Erreur, impossible de vérifier la prévoyance du diabête du patient."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de la prévoyance:",
          error
        );
        window.alert(
          "Erreur, impossible de vérifier la prévoyance du diabête du patient."
        );
      }
    };
    riskEngine();
  }, [urlPrevoyance]);

  /////////

  const onSubmitNote = async (e) => {
    e.preventDefault();
    const payload = {
      patientId: noteData.patientId,
      content: noteData.content.replaceAll("\r\n", "\n").replaceAll("\r", "\n"),
    };

    const res = await fetch(urlAddNotes, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("POST failed", res.status, err);
      window.alert(
        "Erreur, impossible de créer une note sur la fiche du patient."
      );
      return;
    } else {
      window.alert("Note ajoutée avec succès.");

      // AJOUT: Vider le champ de saisie
      setNoteData({
        patientId: id,
        content: "",
      });

      // AJOUT: Recharger les notes
      await loadNotesPatient();
    }
  };

  const handleActiveKeywordsDisplay = () => {
    setIsKeywordsActive((prev) => !prev);
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

  //////////////

  return (
    <>
      <div className="patientprofile-container">
        <div className="patientprofile-upper-flex">
          <div
            className="patientprofile-button-return"
            onClick={handleReturnToPatientsList}
          >
            Retour
          </div>
          <div className="patientprofile-status-container">
            <div className="patientprofile-status-flex">
              <div id="patientprofile-status-title">Prévoyance diabête: </div>
              <div
                className="patientprofile-status-badge"
                style={{ backgroundColor: statusColor }}
              ></div>
              {status && <div className="patientprofile-status"> {status}</div>}
            </div>
            {prevoyance && (
              <div className="patientprofile-keywords-display-modal">
                <div
                  onClick={handleActiveKeywordsDisplay}
                  className="patientprofile-keywords-active"
                >
                  Voir les {prevoyance.matchedCount} symptômes
                </div>
                <div
                  className="patientprofile-keywords-container"
                  style={{ display: isKeywordsActive ? "flex" : "none" }}
                >
                  {isKeywordsActive
                    ? prevoyance.matchedKeywords.map((k, idx) => (
                        <div className="patientprofile-keyword" key={idx}>
                          {k}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="patientprofile-flex-central-container">
          <div id="patientprofile-flex-central">
            {isUpdateActive ? (
              <FormProfile
                patient_data={patient}
                formData_data={formData}
                ChangeFormInfo_onChange={ChangeFormInfo}
              />
            ) : (
              <BlocProfile patient_data={patient} />
            )}

            {!isUpdateActive && (
              <div className="patientprofile-lines-container">
                <div className="patientprofile-buttons-container">
                  <div
                    className="patientprofile-button patientprofile-button-large"
                    onClick={handleActiveUpdate}
                  >
                    Mettre à jour
                  </div>
                  <div
                    className="patientprofile-button patientprofile-button-large"
                    onClick={onSubmitDelete}
                  >
                    Suppression
                  </div>
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
          <div className="patientprofile-notes-container">
            <div>
              <div className="patientprofile-notes-title">
                Historique des consultations{" "}
              </div>
              <div id="patientprofile-notes">
                {notes &&
                  notes.map((n, idx) => (
                    <div className="patientprofile-note" key={idx}>
                      <div className="patientprofile-note-date">
                        {DateNormalisation(n.createdAt)}:
                      </div>
                      <div className="patientprofile-note-info">
                        {n.content}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="patientprofile-note-add">
              <label htmlFor="notes">Ajouter une note au dossier:</label>
              <textarea
                type="textarea"
                id="notes"
                name="content"
                value={noteData.content}
                onChange={(e) =>
                  setNoteData((s) => ({ ...s, content: e.target.value }))
                }
                className="patientprofile-note-content"
              ></textarea>
            </div>
            <div className="patientprofile-buttons-container">
              <div
                className="patientprofile-button patientprofile-button-validation"
                onClick={onSubmitNote}
              >
                Ajouter
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile;
