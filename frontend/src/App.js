import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="chat" element={<Chat />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
