import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles/App.css";
import PagePatientList from "./pages/PatientList/PatientList";
import PagePatientProfile from "./pages/PatientProfile/PatientProfile";
import PagePatientCreation from "./pages/PatientCreation/PatientCreation";
import PageConnexion from "./pages/Connexion/Connexion";
import PageHome from "./pages/Home/Home";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/patients" element={<PagePatientList />} />
          <Route path="/patients/:id" element={<PagePatientProfile />} />
          <Route path="/patient/add" element={<PagePatientCreation />} />
          <Route path="/connexion" element={<PageConnexion />} />
          <Route path="/" element={<PageHome />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
