
function FormProfile({ patient_data, formData_data, ChangeFormInfo_onChange}) {
  return (
    <form className="patientprofile-lines-container">
            <div className="patientprofile-line">
              <label htmlFor="form-nom">
                Nom:
                <input
                  type="text"
                  id="form-nom"
                  name="nom"
                  placeholder={patient_data.nom ?? ""}
                  value={formData_data.nom}
                  onChange={ChangeFormInfo_onChange}
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
                  value={formData_data.prenom}
                  placeholder={patient_data.prenom ?? ""}
                  onChange={ChangeFormInfo_onChange}
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
                  value={formData_data.dateNaissance}
                  defaultValue={patient_data.dateNaissance ?? ""}
                  onChange={ChangeFormInfo_onChange}
                />
              </label>
            </div>
            <div className="patientprofile-line">
              <label htmlFor="">
                Genre:
                <select
                  htmlFor="form-genre"
                  name="genre"
                  value={formData_data.genre}
                  placeholder={patient_data.genre ?? ""}
                  onChange={ChangeFormInfo_onChange}
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
                  value={formData_data.adresse}
                  placeholder={patient_data.adresse ?? ""}
                  onChange={ChangeFormInfo_onChange}
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
                  value={formData_data.telephone}
                  placeholder={patient_data.telephone ?? ""}
                  onChange={ChangeFormInfo_onChange}
                />
              </label>
            </div>
          </form>
  )
}

export default FormProfile
