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
    }, 6000); // Optional delay to show the preloader

    return () => clearTimeout(timer);
  }, [navigate]);

  return showPreloader ? <Loader /> : null;
};

export default AutoRedirect;
