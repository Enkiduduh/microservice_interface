import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles/App.css";
import PagePatientList from "./pages/PatientList/PatientList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/patients" element={<PagePatientList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
