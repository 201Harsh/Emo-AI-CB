import React, { useContext, useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength += 1;
    if (pass.length > 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    setPasswordStrength(calculatePasswordStrength(pass));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setIsLoading(true);
    const newUser = { name, email, password };

    try {
      const response = await AxiosInstance.post("/users/register", newUser);
      if (response.status === 200) {
        const userData = response.data.data;
        localStorage.setItem("email", userData.email);
        localStorage.setItem("name", userData.name);
        navigate("/otp");
        toast.success("Please verify your email.", {
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
      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          toast.error(err.msg || err, {
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
        });
      } else {
        toast.error(error.response?.data?.errors || "Something went wrong!", {
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
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-gray-600";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      case 5:
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const ServiceNotAvailable = () => {
    toast.error("Service not available", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
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
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-400/10 filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-amber-600/10 filter blur-3xl"
        ></motion.div>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 z-10">
        {/* Left side - Welcome content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block w-full max-w-md text-center md:text-left"
        >
          <div className="bg-gray-950/70 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg mx-auto md:mx-0">
              <SparklesIcon className="h-7 w-7 text-gray-900" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to EmoAI
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Join thousands of users who are already benefiting from our
              AI-powered emotional intelligence platform.
            </p>

            <div className="space-y-4">
              {[
                "Advanced emotion recognition technology",
                "Personalized interaction based on your mood",
                "Secure end-to-end encrypted conversations",
                "24/7 customer support",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right side - Registration form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-950/70 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-gray-700/50"
        >
          {/* Glow effect */}
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-yellow-400 shadow-glow"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="md:hidden inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-4 shadow-lg">
              <SparklesIcon className="h-7 w-7 text-gray-900" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-200">
              Join our community and unlock all features
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative group">
                <UserIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
                <input
                  type="text"
                  name="name"
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your full name"
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative group">
                <EnvelopeIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) =>
                    e.target.value && validateEmail(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-300 text-sm font-medium">
                  Password
                </label>
                <span className="text-xs text-gray-300">
                  Strength:
                  <span
                    className={`ml-1 font-semibold ${
                      passwordStrength < 2
                        ? "text-red-400"
                        : passwordStrength < 4
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"][
                      passwordStrength
                    ] || "Perfect"}
                  </span>
                </span>
              </div>
              <div className="relative group">
                <LockClosedIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  required
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-200 hover:text-yellow-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* Password strength meter */}
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Use 6+ characters with a mix of letters, numbers & symbols
              </p>
            </motion.div>

            {/* Terms and conditions */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="focus:ring-yellow-500 h-4 w-4 cursor-pointer text-yellow-600 border-gray-600 rounded bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-300">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-yellow-400 hover:text-yellow-500"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full cursor-pointer flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-lg hover:shadow-yellow-500/20 ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-200">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-yellow-400 hover:text-yellow-500 transition-colors"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
