import { useNavigate, Link } from "react-router-dom";
import Doctors_img from "../../../public/doctors.png";

function Home() {
  return (
    <div className="home-container">
      <div className="home-central">
        <div className="home-central-left">
          <div className="home-central-catch catch-title">MediLabo Solutions</div>
          <div>
            <div className="home-central-catch catch-up">Helping You</div>
            <div className="home-central-catch catch-down">To Heal People</div>
          </div>
          <Link className="home-button" to="/connexion">Se connecter</Link>
        </div>
        <img src={Doctors_img} alt="Logo medilabo" className="home-photo-img" />
      </div>
    </div>
  );
}

export default Home;
