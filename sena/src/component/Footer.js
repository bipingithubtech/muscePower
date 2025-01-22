import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>Health Shope</h2>
          <p>
            Your one-stop health e-commerce platform, offering trusted products
          </p>
          <p>
            {" "}
            personalized care, and a seamless shopping experience. Discover a
          </p>
          <p>
            {" "}
            healthier you with cutting-edge solutions, affordable prices, and a
          </p>
          <p> commitment to your well-being. Wellness, delivered!</p>
        </div>
        <div className="footer-middle">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/story">About Us</a>
            </li>
            <li>
              <a href="/chat-support">Contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
