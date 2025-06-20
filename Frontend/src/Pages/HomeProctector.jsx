import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../Config/Axios";
import Loader from "../Components/Loader";

const HomeProctector = ({ children }) => {
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(true);

  if (!token) {
    Navigate("/");
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await AxiosInstance.get("/users/getUser");
        if (res.status === 200) {
          localStorage.setItem("AICompanion", res.data.data.AICompanion);
          setTimeout(() => {
            setIsLoading(false);
          }, 4000);
        } else {
          localStorage.clear();
          Navigate("/login");
        }
      } catch (error) {
        localStorage.clear();
        Navigate("/");
      }
    };
    checkUser();
  }, [token, Navigate]);

  if (IsLoading)
    return (
      <>
        <Loader />
      </>
    );

  return <>{children}</>;
};

export default HomeProctector;
