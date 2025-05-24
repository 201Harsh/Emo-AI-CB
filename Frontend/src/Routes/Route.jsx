import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "../Pages/Start";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Features from "../Pages/Feature";
import HelpPage from "../Pages/HelpPage";
import Contact from "../Pages/Contact";
import About from "../Pages/About";
import Pricing from "../Pages/Pricing";
import AuthPrompt from "../Pages/AuthPrompt";
import OTPVerification from "../Pages/OtpVerification";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/authprompt" element={<AuthPrompt />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
