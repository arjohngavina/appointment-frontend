//export default function DashboardPage() {
//    return <h2>Dashboard Page</h2>;
//  }
  import React, { useEffect, useState } from "react";

  export default function DashboardPage() {
    const [appointments, setAppointments] = useState([]);
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      fetch("http://localhost:5000/api/appointments", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data); // 👈 log this
        setAppointments(data);
      })
      .catch(err => console.error("Unauthorized or error:", err));
    }, [token]);
  
    return (
      <div>
        <h2>My Appointments</h2>
        <ul>
          {appointments.map((appt, idx) => (
            <li key={idx}>{appt.date} - {appt.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  
