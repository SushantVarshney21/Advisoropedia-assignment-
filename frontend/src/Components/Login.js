import React, { useState } from "react";
import "../CSS/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${props.port}/users/login`,
        { email, password }
      );
      if (response) {
        localStorage.setItem("token", response.data.data.accessToken);
        nav("/");
        alert("login successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Invailed Credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        You don't have any account please <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
