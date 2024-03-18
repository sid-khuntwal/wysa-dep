import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    toast.info(
      "Use 'root' for username & password if you don't want to signup"
    );
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      const response = await fetch(
        "https://wysa-dep.vercel.app/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      // console.log(response);
      if (!response.ok) {
        toast.error("Invalid username or password");
        return;
      }

      toast.success("Login Successfull");

      const data = await response.json();
      console.log(data);

      if (data.success) {
        window.location.href = "/chat";
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while logging in");
    }
  };

  const handleusernameChange = (e) => {
    setusername(e.target.value);
  };

  const handlePassChange = (e) => {
    setpassword(e.target.value);
  };

  const handleSignUp = () => {
    // window.location.href = "/signup";
    navigate("/signup");
  };

  return (
    <div className="container">
      <h1>Wysa</h1>
      <input
        className="input"
        placeholder="Username (root)"
        value={username}
        onChange={(e) => handleusernameChange(e)}
      />
      <input
        className="input"
        placeholder="Password (root)"
        value={password}
        onChange={(e) => handlePassChange(e)}
      />
      <button className="btn" onClick={handleLogin}>
        Login
      </button>

      <button className="btn" onClick={handleSignUp}>
        Sign Up
      </button>
      <ToastContainer />
    </div>
  );
};

export default Login;
