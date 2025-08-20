import { Link } from "react-router-dom";
function Page505() {
  return (
    <div className="page500-container">
      <h1>Une erreur est survenue</h1>
      <p>Réessayez plus tard ou contactez le support.</p>
      <Link to="/">← Retour</Link>
    </div>
  );
}

export default Page505;
