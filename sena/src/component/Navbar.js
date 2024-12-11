import { TbShoppingCartHeart } from "react-icons/tb";
import "../component/Nanbar.css";
import { Link } from "react-router-dom";
import { useUser } from "./storage/Context";
import axios from "axios";

const Navbar = () => {
  const { token, setToken } = useUser();
  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/register/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setToken(null); // Clear the token
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
      <div className="navbar-logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsd--nkZuhhlYJhATng1LErs-oeqg7-IqOXRpeKL35bag1e9LZB1B6ifXCQQ0rtFZaKZY&usqp=CAU"
          alt="Logo"
        />
      </div>

      {/* Search Section */}
      <div className="navbar-search">
        <input type="text" placeholder="Type a Product name.e.g ,Biozyme" />
      </div>

      <div className="navbar-actions">
        <TbShoppingCartHeart className="navbar-icon" />
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
