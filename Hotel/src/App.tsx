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
import MyReservationsPage from "./views/MyReservationsPage";
import ProfilePage from "./views/ProfilePage";
import UserManagementPage from "./views/UserManagementPage";
import RoomManagementPage from "./views/RoomManagementPage";
import ReservationManagementPage from "./views/ReservationManagementPage";
import ReservationEventRoomPage from "./views/ReservationEventRoomPage";
import CreateUserPage from "./views/CreateUserPage";
import CocinaPage from "./views/CocinaPage";
import VerificationPage from "./views/VerificationPage";
import { useEffect } from "react";
import EventsPage from "./views/EventsPage";
import RoomsInfoPage from "./views/RoomsPage";
import Reservation from "./views/ReservationPage";
import ReserveEventRoom from "./views/ReserveEventRoom";

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
      <Route path="/my-reservations" element={<MyReservationsPage />} />
      <Route path="/ai-reservation" element={<AIChatPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/history-info" element={<HistoryPage />} />
      <Route path="/rooms-info" element={< RoomsInfoPage/>} />
      <Route path="/info-cocina" element={<CocinaPage />} />
      <Route path="/info-eventos" element={<EventsPage />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/reserve-event-room" element={<ReserveEventRoom />} />

      {/* Admin */}
      <Route path="/admin/users" element={<UserManagementPage />} />
      <Route path="/admin/rooms" element={<RoomManagementPage />} />
      <Route path="/admin/reservation-management" element={<ReservationManagementPage />} />
      <Route path="/admin/reservation-event-room" element={<ReservationEventRoomPage />} />
      <Route path="/admin/create-user" element={<CreateUserPage />} />
    </Routes> 
  )
}