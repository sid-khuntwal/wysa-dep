import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("/");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, type: "text" },
      ]);
    });

    socket.on("image", (imageUrl) => {
      setImageUrl(imageUrl);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "image", content: imageUrl },
      ]);
    });

    scrollToBottom();

    return () => {
      socket.off("message");
      socket.off("image");
    };
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, type: "sent" },
    ]);

    socket.emit("sendMessage", newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="message-box">
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
                alt = `${imageUrl}`
                
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
