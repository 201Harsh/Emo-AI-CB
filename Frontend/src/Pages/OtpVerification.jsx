import {
  LockClosedIcon,
  ArrowRightCircleIcon,
  CpuChipIcon,
} from "@heroicons/react/20/solid";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import AxiosInstance from "../Config/Axios";
import { motion } from "framer-motion";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const Navigate = useNavigate();

  const email = localStorage?.getItem("email") || "emoaichatbot@gmail.com";

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input if value entered
    if (element.value && index < 3 && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace/delete
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otp];

      // If current field is empty, move to previous field and clear it
      if (!e.target.value && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      } else {
        // Clear current field
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Handle left arrow key
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    // Handle right arrow key
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpResend = async () => {
    try {
      const response = await AxiosInstance.post("/users/resendotp", {
        email: email,
      });
      if (response.status === 200) {
        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    // Add your OTP verification logic here

    try {
      const response = await AxiosInstance.post("/users/verify", {
        email,
        otp: enteredOtp,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => {
          Navigate("/home");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.error || error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800/70 to-gray-700/40 overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <div className="shbox rounded-full p-2 bg-gradient-to-br from-yellow-400 to-amber-600">
            <CpuChipIcon className="h-8 w-8 text-gray-900" />
          </div>
          <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
            EmoAI ChatBot
          </span>
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4 py-8">
        <div className="bg-gray-950/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8 shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Verify Your Account
            </h1>
            <p className="text-gray-100">
              We've sent a 4-digit code to your email
            </p>
            <p className="text-yellow-400 font-medium mt-1">{email}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  placeholder="."
                  className="w-16 h-16 text-center text-2xl font-bold bg-gray-950/40 border border-gray-700 rounded-lg text-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                />
              ))}
            </div>

            <div className="text-center text-sm text-gray-100">
              Didn't receive code?{" "}
              <button
                onClick={handleOtpResend}
                type="button"
                className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
              >
                Resend
              </button>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer flex justify-center items-center py-3 px-4 bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg font-semibold  hover:animate-pulse disabled:opacity-60 disabled:text-gray-800"
              disabled={otp.some((digit) => digit === "")}
            >
              Verify OTP
              <ArrowRightCircleIcon className="ml-2 h-5 w-5" />
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-100">
            Wrong email?{" "}
            <Link
              to="/register"
              className="font-medium cursor-pointer text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
            >
              Change email address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
