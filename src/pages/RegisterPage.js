import React, { useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../aws-cognito";
import { useNavigate } from "react-router-dom"; // ✅ Import React Router
import styles from "../styles"; // ✅ shared styles

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleRegister = (e) => {
    e.preventDefault();

    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    UserPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        setMessage("❌ " + (err.message || JSON.stringify(err)));
      } else {
        console.log("Cognito user:", result.user);
        setMessage("✅ Registration successful. Redirecting to confirmation...");
        setTimeout(() => {
          // ✅ Pass the email along if you want to prefill it on ConfirmPage
          navigate("/confirm", { state: { email } });
        }, 2500); // small delay for UX
      }
    });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.card}>
      <h2 style={styles.heading}>Register</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
	  required style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
	  required style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
