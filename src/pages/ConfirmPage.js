import React, { useState, useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../aws-cognito";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import styles from "../styles"; // ✅ shared styles

export default function ConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ React Router navigation hook
  const prefilledEmail = location.state?.email || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  }, [prefilledEmail]);

  const handleConfirm = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        setMessage("❌ Confirmation failed: " + err.message);
      } else {
        setMessage("✅ Account confirmed! Redirecting to login...");
        console.log("Confirmation success:", result);
        setTimeout(() => {
          navigate("/"); // ✅ Go to login page
        }, 2500);
      }
    });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleConfirm} style={styles.card}>
	<h2 style={styles.heading}>Confirm Your Email</h2>
        <input
          type="email"
          value={email}
          placeholder="Email you used to register"
          onChange={(e) => setEmail(e.target.value)}
	  required style={styles.input}
        />
        <input
          type="text"
          placeholder="Confirmation Code"
          onChange={(e) => setCode(e.target.value)}
	  required style={styles.input}
        />
        <button type="submit" style={styles.button}>Confirm</button>
	{message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
