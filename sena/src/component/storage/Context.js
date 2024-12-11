import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";

// Create a context for user authentication
const UserContext = createContext();

// Provider component to wrap around components that need access to the user context
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  console.log("token acess:=>", token);

  useEffect(() => {
    // Function to fetch the access token from the backend
    const getAccessToken = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/register/refecth",
          {
            withCredentials: true, // Include credentials (cookies) in the request
          }
        );
        console.log("Fetched token:", res.data);
        setToken(res.data); // Set the token in the state
      } catch (err) {
        console.error("Problem in getAccessToken:", err);
      }
    };

    // Call the function to fetch the token
    getAccessToken();
  }, []); // Empty dependency array to run the effect once when the component mounts

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children} {/* Render the child components */}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);

  // Check if the context is used outside of the UserProvider
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
