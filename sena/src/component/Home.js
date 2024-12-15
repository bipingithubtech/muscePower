import React from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import "./Home.css"; // Separate CSS file for styling
import BlockBusterDeals from "./BlockBusterDeals";

const Home = () => {
  return (
    <div className="maindiv">
      {/* Navigation List */}
      <div className="list">
        <div className="dropdown">
          <span>All Products</span>
          <div className="dropdown-content">
            <p>Product 1</p>
            <p>Product 2</p>
            <p>Product 3</p>
          </div>
        </div>
        <div className="dropdown">
          <span>Offers</span>
          <div className="dropdown-content">
            <p>Offer 1</p>
            <p>Offer 2</p>
          </div>
        </div>
        <Link to="/chat-support">Chat Support</Link>
        <Link to="/our-story">Our Story</Link>
      </div>
      {/* Banner Section */}
      <div className="banner">
        <Banner />
      </div>
      <div>
        <BlockBusterDeals />
      </div>
    </div>
  );
};

export default Home;
