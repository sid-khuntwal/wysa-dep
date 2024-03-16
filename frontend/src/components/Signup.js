import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Signup = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handlePassChange = (e) => {
    setpassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Registration Successful!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isSuccess) {
    window.location.href = "/";
  }

  return (
    <div className="container">
      <h1>Wysa</h1>
      <input
        className="input"
        placeholder="username"
        value={username}
        onChange={(e) => handleusernameChange(e)}
      />
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        placeholder="Password"
        value={password}
        onChange={(e) => handlePassChange(e)}
      />
      <button className="btn" onClick={handleSignUp}>
        Signup
      </button>
      <ToastContainer />
    </div>
  );
};

export default Signup;
