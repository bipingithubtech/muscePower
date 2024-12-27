import { TbShoppingCartHeart } from "react-icons/tb";
import "../component/Nanbar.css";
import { Link } from "react-router-dom";
import { useUser } from "./storage/Context";
import axios from "axios";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { token, setToken } = useUser();
  const [cartCount, setCartCount] = useState([]); // Use an array to store cart data
  const [totalItems, setTotalItems] = useState(0);
  console.log("cartitem", cartCount); // State to hold total items count

  // Fetch cart data and calculate total items count on component mount or when token changes
  useEffect(() => {
    const fetchCartCount = async () => {
      if (token) {
        try {
          const res = await axios.get(
            "http://localhost:8000/api/cart/getAllProduct",
            {
              headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
            }
          );
          setCartCount(res.data); // Store the fetched data in cartCount state

          // Calculate total items count from the fetched data
          const total = res.data.map((cart) => cart.items.length);
          // or  .reduce((acc, itemCount) => acc + itemCount, 0);
          setTotalItems(total); // Set the total items count
        } catch (error) {
          console.error("Failed to fetch cart count:", error);
        }
      }
    };

    fetchCartCount();
  }, [token]); // Re-fetch if token changes (i.e., login or logout)

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/register/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setToken(null); // Clear the token
        setTotalItems(0); // Reset the total items count on logout
        alert("Logged out successfully!");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="navbar">
      {/* Logo Section */}

      <Link to={"/"}>
        <div className="navbar-logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsd--nkZuhhlYJhATng1LErs-oeqg7-IqOXRpeKL35bag1e9LZB1B6ifXCQQ0rtFZaKZY&usqp=CAU"
            alt="Logo"
          />
        </div>
      </Link>

      {/* Search Section */}
      <div className="navbar-search">
        <input type="text" placeholder="Type a Product name.e.g ,Biozyme" />
      </div>

      {/* Navbar Actions */}
      <div className="navbar-actions">
        <Link to={"/cart"}>
          <div className="navbar-cart">
            <TbShoppingCartHeart className="navbar-icon" />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span> // Display total items count
            )}
          </div>
        </Link>

        {token ? (
          <div className="navbar-login">
            <h1>{token.name}</h1>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-login">
            <Link to="/register">
              <h1>Login/Signup</h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
