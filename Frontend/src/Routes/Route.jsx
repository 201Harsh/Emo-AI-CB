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
import HomeProctector from "../Pages/HomeProctector";
import Profile from "../Pages/Profile";
import Settings from "../Pages/Setting";
import AutoRedirect from "../Pages/AutoRedirect";
import Payment from "../Pages/Payment";
import Careers from "../Pages/Carrer";
import PersonalDetails from "../Pages/PersonalDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AutoRedirect />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/authprompt" element={<AuthPrompt />} />
        <Route
          path="/home"
          element={
            <HomeProctector>
              <Home />
            </HomeProctector>
          }
        />
        <Route path="/features" element={<Features />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment/:planId" element={<Payment />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/details" element={<PersonalDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
