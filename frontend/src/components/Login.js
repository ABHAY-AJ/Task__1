import React, { useState } from "react";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';  // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.data.token); // Store token
      navigate("/profile"); // Redirect to profile page or dashboard
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const forgetPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div className="forgot-password">
        <Link onClick={forgetPassword}>Forgot password?</Link>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
