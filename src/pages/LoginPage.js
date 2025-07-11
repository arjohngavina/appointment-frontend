import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../aws-cognito";
import { useAuth } from "../AuthContext"; 
import styles from "../styles"; // ✅ shared styles


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        const token = data.getIdToken().getJwtToken();
        login(token, email); // ✅ update context
        //setMessage("✅ Login successful! Token: " + data.getIdToken().getJwtToken());
        setMessage("✅ Login successful!" );
        setEmail("");
        setPassword("");

        const idToken = data.getIdToken().getJwtToken();         // ⚠️ for frontend use
        const accessToken = data.getAccessToken().getJwtToken(); // ✅ for backend auth
        const refreshToken = data.getRefreshToken().getToken();
      
        // Log it out (or display for Postman use)
        console.log("✅ Access Token:", accessToken);
        console.log("🪪 ID Token:", idToken);
        console.log("🔁 Refresh Token:", refreshToken);
      
        //setMessage("Access Token: " + accessToken);
      
        // Optional: Store for use in frontend API calls
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("userEmail", email);
      },
      onFailure: (err) => {
        console.error("Login failed:", err);
        alert("Login failed: " + err.message);
      }
    });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
