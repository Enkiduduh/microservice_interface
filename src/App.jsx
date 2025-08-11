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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/patients" element={<PagePatientList />} />
          <Route path="/patients/:id" element={<PagePatientProfile />} />
          <Route path="/patient/add" element={<PagePatientCreation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
