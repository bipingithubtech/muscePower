import React from "react";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/RegistrationPage/Signup";
import Login from "./component/RegistrationPage/Login";
import { UserProvider } from "./component/storage/Context";
import RecoverPassword from "./component/RegistrationPage/RecoverPassword";
import OtpPage from "./component/RegistrationPage/OtpPage";
import Home from "./component/Home";
import ProductPost from "./component/ProductPost";
import CartItem from "./component/CartItem";
import ChatSupport from "./component/ChatSupport";
import AboutPage from "./component/Story";

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/register" element={<Signup />}></Route>
            <Route path="/register-login" element={<Login />}></Route>
            <Route
              path="/recover-password"
              element={<RecoverPassword />}
            ></Route>
            <Route path="/otp" element={<OtpPage />}></Route>
            <Route path="/product" element={<ProductPost />}></Route>
            <Route path="/cart" element={<CartItem />}></Route>
            <Route path="/chat-support" element={<ChatSupport />}></Route>
            <Route path="/story" element={<AboutPage />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
