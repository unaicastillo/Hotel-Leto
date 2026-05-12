import { Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import LandingPage from './views/LandingPage';
import HistoryPage from "./views/HistoryPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/historia" element={<HistoryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}
