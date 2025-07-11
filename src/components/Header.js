import React from "react";
import { useAuth } from "../AuthContext"; // adjust path as needed

export default function Header() {
  const { userEmail, logout } = useAuth();

  return (
    <header style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      {userEmail ? (
        <>
          <span>Welcome, {userEmail}</span>
          <button onClick={logout} style={{ marginLeft: "1rem" }}>Logout</button>
        </>
      ) : (
        <span>Not logged in</span>
      )}
    </header>
  );
}
