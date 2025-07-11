import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext"; // Optional, fallback to localStorage works too
import styles from "../styles";
/*
export default function CreateAppointment() {
  const { token: contextToken } = useAuth() || {};
  const token = contextToken || localStorage.getItem("idToken");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date) {
      setMessage("❌ Title and date are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        { title, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Appointment created successfully!");
      setTitle("");
      setDate("");
    } catch (err) {
      console.error("Error creating appointment:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage("❌ Failed to create appointment.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.heading}>Create Appointment</h2>
        <input
          type="text"
          placeholder="Appointment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

*/