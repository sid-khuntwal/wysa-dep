import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("/");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Listen for new messages from the server
    socket.on("message", (newMessage) => {
      // Add the received message to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, type: "text" },
      ]);
    });

    // Listen for image URL from the server
    socket.on("image", (imageUrl) => {
      setImageUrl(imageUrl);
      // Add the received image URL to the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "image", content: imageUrl },
      ]);
    });

    // Clean up the socket listener when component unmounts
    return () => {
      socket.off("message");
      socket.off("image");
    };
  }, []);

  const handleSend = () => {
    // Add the sent message to the messages array
    console.log(newMessage);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, type: "sent" },
    ]);

    socket.emit("sendMessage", newMessage);
    // Clear the input field after sending the message
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="message-box">
        {/* Display messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type === "sent" ? "sent" : "received"}`}
          >
            {msg.type === "text" || msg.type === "sent" ? (
              <div className="message-text">{msg.text}</div>
            ) : (
              <img
                className="image-message"
                src={msg.content}
                alt="Received Image"
              />
            )}
          </div>
        ))}
      </div>
      <div className="input-box-div">
        <input
          className="chat-input"
          placeholder="Ask me something..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
