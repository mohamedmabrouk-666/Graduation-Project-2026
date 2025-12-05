// 


//=============================================================
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // react-router hook
import '../styling/Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate(); // hook to redirect pages

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // ✅ Redirect to Home page after successful registration
        navigate("/home");
      } else if (data.error === "Email already exists") {
        alert("Email already exists. Redirecting to login...");
        navigate("/login"); // redirect to login page if email exists
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      alert("❌ Failed to connect to API: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose a secure password"
          required
        />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p>
        Already registered? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
