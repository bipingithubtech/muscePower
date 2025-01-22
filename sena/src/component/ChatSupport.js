import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat.css";

const socket = io("http://localhost:8000"); // Backend URL

const ChatSupport = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("repply from back", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("repply from back");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="about-section">
        <h2>About Us</h2>
        <p>
          Welcome to Chat Support! We're here to assist you with any questions
          or concerns you might have. Feel free to ask us anything.
        </p>
        <p>
          Our team is dedicated to providing excellent support and ensuring your
          satisfaction. Thank you for choosing our service!
        </p>
      </div>
      <div className="chat-box">
        <div className="chat-header">Chat Support</div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
