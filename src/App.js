import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SchedulePage from "./pages/SchedulePage";
import BookingPage from "./pages/BookingPage";
import ConfirmPage from "./pages/ConfirmPage";
import Header from "./components/Header";
import CreateAppointment from "./pages/CreateAppointment";


function App() {
  return (
    <Router>
      <Header /> {/* ✅ This makes Header show on all pages */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/create-appointment" element={<CreateAppointment />} />

      </Routes>
    </Router>
  );
}

export default App;
