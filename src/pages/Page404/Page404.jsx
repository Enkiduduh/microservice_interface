import { Link } from "react-router-dom";
function Page404() {
  return (
    <div className="page404-container">
      <h1>404</h1>
      <p>Oups, cette page n’existe pas.</p>
      <Link to="/">← Retour à l’accueil</Link>
    </div>
  )
}

export default Page404
