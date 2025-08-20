import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./security/AuthProvider";
import RequireAuth from "./security/RequireAuth";
import "./styles/App.css";
import PagePatientList from "./pages/PatientList/PatientList";
import PagePatientProfile from "./pages/PatientProfile/PatientProfile";
import PagePatientCreation from "./pages/PatientCreation/PatientCreation";
import PageConnexion from "./pages/Connexion/Connexion";
import PageHome from "./pages/Home/Home";
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import Page404 from "./pages/Page404/Page404";
import Page500 from "./pages/Page500/Page500";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            {/* Routes protégées */}
            <Route
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route path="/patients" element={<PagePatientList />} />
              <Route path="/patients/:id" element={<PagePatientProfile />} />
              <Route path="/patients/add" element={<PagePatientCreation />} />
              <Route path="/oops" element={<Page500 />} />
              <Route path="*" element={<Page404 />} />
            </Route>

            {/* Routes publiques */}
            <Route path="/connexion" element={<PageConnexion />} />
            <Route path="/" element={<PageHome />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
