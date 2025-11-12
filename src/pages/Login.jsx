import { useState } from "react";
import "./../styles/Login.css";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const correctUser = "admin";
  const correctPass = "1234";

  const handleLogin = () => {
    if (username === correctUser && password === correctPass) {
      setIsLoggedIn(true);
    } else {
      alert("❌ Username หรือ Password ไม่ถูกต้อง!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Login</h2>
        <p className="hint">ใช้ Username: <b>admin</b> / Password: <b>1234</b></p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
