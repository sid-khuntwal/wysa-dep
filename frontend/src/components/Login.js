import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <h1>Wysa</h1>
      <input className="input" placeholder="Email" />
      <input className="input" placeholder="Password" />
      <button className="btn">Login</button>
    </div>
  );
};

export default Login;
