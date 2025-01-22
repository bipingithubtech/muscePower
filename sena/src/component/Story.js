import React from "react";
import "./Story.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Journey to Wellness Starts Here</h1>
          <p>
            Discover how our health e-commerce app revolutionized healthcare and
            its bright future.
          </p>
          <a href="#history" className="cta-btn">
            Explore More
          </a>
        </div>
      </header>

      {/* History Section */}
      <section id="history" className="history-section">
        <h2>Our Journey</h2>
        <div className="content">
          <div className="text">
            <p>
              Founded in 2020, our app began with a mission to bridge the gap
              between health products and people. With a user-first approach, we
              brought convenience, affordability, and trust to healthcare
              shopping.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our history"
            className="animated-image"
          />
        </div>
      </section>

      {/* Future Section */}
      <section id="future" className="future-section">
        <h2>The Future</h2>
        <div className="content">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our future vision"
            className="animated-image"
          />
          <div className="text">
            <p>
              The future holds endless possibilities for us. We're integrating
              AI to personalize user experiences and expanding globally to
              provide quality healthcare products at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footers">
        <p>&copy; 2025 Your Health E-Commerce App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
