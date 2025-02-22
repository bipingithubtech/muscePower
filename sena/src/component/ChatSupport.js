import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat.css";
import { useUser } from "./storage/Context";
import axios from "axios";

const socket = io("http://localhost:8000"); // Connect to backend

const ChatSupport = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { token } = useUser();

  const userId = token?._id;
  const allApi = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/chat/${userId}`,
      {
        withCredentials: true,
      }
    );
    setMessages(response.data);
  };
  useEffect(() => {
    if (userId) {
      allApi();
    }

    socket.on("reply from back", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("reply from back");
    };
  }, [userId]);

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        text: message,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      socket.emit("chat message", { userId, message });
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
      </div>

      <div className="chat-box">
        <div className="chat-header">Chat Support</div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}: </strong> {msg.text}
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
