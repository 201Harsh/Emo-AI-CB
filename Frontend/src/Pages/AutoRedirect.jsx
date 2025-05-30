import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import Start from "../Pages/Start";

const AutoRedirect = () => {
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setShowPreloader(false);
      if (token) {
        navigate("/home");
      } else {
        return (
          <>
            <Start />
          </>
        );
      }
    }, 1200); // Optional delay to show the preloader

    return () => clearTimeout(timer);
  }, [navigate]);

  return showPreloader ? (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-bold text-yellow-400">Loading....</h1>
    </div>
  ) : null;
};

export default AutoRedirect;
