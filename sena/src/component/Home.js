import React from "react";
import Banner from "./Banner";
import "./Footer.css";

import { Link } from "react-router-dom";
import "./Home.css"; // Separate CSS file for styling
import BlockBusterDeals from "./BlockBusterDeals";
import CreateProduct from "./CreateProduct";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="maindiv">
        {/* Navigation List */}
        <div className="list">
          <div className="dropdown">
            <Link to={"/product"}>
              {" "}
              <span>All Products</span>
            </Link>
          </div>

          <Link to="/chat-support">Chat Support</Link>
          <Link to="/story">Our Story</Link>
        </div>
        {/* Banner Section */}
        <div className="banner">
          <Banner />
        </div>
        <div>
          <BlockBusterDeals />
        </div>
        <div>
          <CreateProduct />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
