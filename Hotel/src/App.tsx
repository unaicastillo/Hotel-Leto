import { Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import LandingPage from './views/LandingPage';
import HistoryPage from "./views/HistoryPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import ForgotPasswordPage from "./views/ForgotPasswordPage";
import UpdatePasswordPage from "./views/UpdatePasswordPage";
import ReservationPage from "./views/ReservationPage";
import AIChatPage from "./views/AIChatPage";
import GestionReservaPage from "./views/GestionReservaPage";
import ProfilePage from "./views/ProfilePage";
import ReservaSalonPage from "./views/ReservaSalonPage";
import UserManagementPage from "./views/UserManagementPage";
import RoomManagementPage from "./views/RoomManagementPage";
import ReservationManagementPage from "./views/ReservationManagementPage";
import { useEffect } from "react";


export const App = () => {

  useEffect(() => {
    const savedTheme = localStorage.getItem("leto_theme");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />
      <Route path="/reserva" element={<ReservationPage />} />
      <Route path="/reserva-inteligente" element={<AIChatPage />} />
      <Route path="/gestion-reserva" element={<GestionReservaPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/reserva-salon" element={<ReservaSalonPage />} />
      <Route path="/info-historia" element={<HistoryPage />} />
      {/* Admin */}
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/rooms" element={<RoomManagementPage />} />
      <Route path="/admin/gestion-reservas" element={<ReservationManagementPage />} />
      <Route path="/admin/habitaciones" element={<UserManagementPage />} />
    </Routes> 
  )
}