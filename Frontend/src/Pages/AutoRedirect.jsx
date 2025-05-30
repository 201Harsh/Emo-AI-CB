import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Start from "../Pages/Start";

const AutoRedirect = () => {
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);
  const [Istoken, setIstoken] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
      if (token) {
        navigate("/home");
      } else {
        setIstoken(true);
      }
    }, 300); // Optional delay to show the preloader

    return () => clearTimeout(timer);
  }, [navigate, token]);

  if (Istoken) {
    return (
      <>
        <Start />
      </>
    );
  }

  return showPreloader ? (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-bold text-yellow-400">Loading....</h1>
    </div>
  ) : null;
};

export default AutoRedirect;
