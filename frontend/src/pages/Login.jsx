// import React, { useState } from "react";
// import "../styling/Login.css"; // ✅ important

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Login request sent! (Front-end only)");
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-box">
//         <h2 className="login-title">Sign in</h2>

//         <form onSubmit={handleSubmit} className="login-form">
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">Continue</button>
//         </form>

//         <p className="register-text">
//           New customer? <a href="/register">Create your account</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



// ==========================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // login successful
        navigate("/home");   // redirect to Home page
      } else {
        alert(data.error);   // show error if user not found
        navigate("/register"); // redirect to Register if user doesn't exist
      }
    } catch (err) {
      alert("❌ Failed to connect to API: " + err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Sign in</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Continue</button>
        </form>

        <p className="register-text">
          New customer? <a href="/register">Create your account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
