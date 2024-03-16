import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
