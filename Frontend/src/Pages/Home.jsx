import React, { useEffect, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  CpuChipIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import PopUp from "../Components/PopUp";
import ChatUI from "./ChatUI";
import AxiosInstance from "../Config/Axios";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsTite, setIsTite] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Added popup state
  const [username, setusername] = useState("");
  const [IsResGen, setIsResGen] = useState(false);

  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "💬",
      title: "Smart Conversations",
      description: "Chat naturally with our advanced AI",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get instant responses to your queries",
    },
    {
      icon: "🎨",
      title: "Creative Genius",
      description: "Generate ideas, stories, and more",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const Navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Desktop
        setIsTite(false);
      } else {
        setIsOpen(false); // Mobile
        setIsTite(true);
      }
    };

    // Small timeout to ensure proper window size calculation especially on mobile refresh
    const timeoutId = setTimeout(() => {
      handleResize(); // Call once after a very short delay
    }, 100); // 100ms

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setusername(localStorage.getItem("name"));
    const resgenornot = localStorage.getItem("responseornot");

    if (resgenornot === "true") {
      setIsResGen(true);
      setShowPopup(false);
    } else {
      setIsResGen(false);
    }
  }, []);

  const popupcontroller = () => {
    setShowPopup(true);
    setIsResGen(true);
  };

  const handleLogout = async () => {
    const response = await AxiosInstance.get("/users/logout");
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        Navigate("/login");
        localStorage.clear();
      }, 2000);
    }
  };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const handleStartServer = async () => {
      const res = await AxiosInstance.get("/users/startServer");

      console.log(res.data.message);
    };
    handleStartServer();
  }, []);

  return (
    <>
      <PopUp
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title={`Hello, ${username}!`}
        message="Impressed with the work so Do Follow Us on Social Media"
      />
      <div className="h-screen w-screen bg-gray-900 relative overflow-hidden">
        {/* Button to open sidebar */}
        {IsTite ? (
          <header className="absolute top-0 left-0 right-0 z-10 bg-transparent backdrop-blur-sm border-b border-gray-800 h-16 flex items-center px-4">
            <div className="flex items-center gap-4">
              <div onClick={() => setIsOpen(true)} className="flex">
                <CpuChipIcon className="h-8 w-8 text-yellow-400" />
                <span className="ml-2 text-xl font-bold text-yellow-400">
                  EmoAI
                </span>
                <Bars3Icon className="h-8 w-8 text-white ml-2 cursor-pointer md:hidden" />
              </div>
            </div>
          </header>
        ) : (
          <Bars3Icon
            className="h-8 w-8 text-white absolute top-0 right-4 cursor-pointer z-20 md:hidden"
            onClick={() => setIsOpen(true)}
          />
        )}

        <div className="flex h-full w-full md:pt-2 pt-16 relative justify-between">
          {/* Sidebar */}
          <div
            className={`fixed md:relative z-40 top-0 left-0 h-full bg-gray-800 text-white transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:w-72 w-80`}
          >
            {/* Close button inside sidebar */}
            <XMarkIcon
              className="h-8 w-8 text-yellow-400 absolute right-4 top-4 cursor-pointer md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar content */}
            <div className="flex flex-col justify-between h-full p-4">
              <div>
                <div className="flex items-center mb-14">
                  <CpuChipIcon className="h-8 w-8 text-yellow-400" />
                  <span className="ml-2 text-xl font-bold text-yellow-400">
                    EmoAI ChatBot
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <Link
                    to="/home"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <HomeIcon className="w-6 h-6 text-yellow-400" />
                    <span>Home</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <UserIcon className="w-6 h-6 text-yellow-400" />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="#"
                    onClick={() => {
                      localStorage.removeItem("responseornot");
                      localStorage.removeItem("chat_messages");
                      IsResGen(false);
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <ChatBubbleLeftIcon className="w-6 h-6 text-yellow-400" />
                    <span>New Chat</span>
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
                  >
                    <Cog6ToothIcon className="w-6 h-6 text-yellow-400" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>

              {/* Toggle Splash Cursor Button at bottom */}
              <div className="p-4">
                <div className="flex items-center gap-2 p-2">
                  <span className="text-sm font-semibold text-gray-300">
                    Logout Account
                  </span>
                </div>
                <div className="p-4 border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer active:scale-95 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 duration-100 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="bg-gray-900 h-full w-full md:w-[80%]">
            {!IsResGen ? (
              <div className="flex flex-col items-center justify-center h-full w-full font-[poppins] p-4 relative z-10 overflow-hidden">
                {/* Main greeting with premium animation */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center mb-12"
                >
                  <div className="relative inline-block">
                    <motion.h1
                      className="font-bold text-4xl text-gray-200 md:text-6xl flex items-center justify-center gap-2 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Hello,{" "}
                      <motion.span
                        className="relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.4,
                          type: "spring",
                          damping: 10,
                          stiffness: 100,
                        }}
                      >
                        <span className="relative z-10">
                          <span className="bg-clip-text ml-2 text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400">
                            {username}
                          </span>
                        </span>
                      </motion.span>
                      <span className="inline-block wave">👋</span>
                    </motion.h1>

                    {/* Subtle floating halo effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-yellow-400/10 blur-xl"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0.3 }}
                      transition={{
                        delay: 0.5,
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>

                  <motion.h2
                    className="text-2xl md:text-3xl font-medium text-gray-300 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <motion.span
                      className="inline-block"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(251, 191, 36, 0)",
                          "0 0 10px rgba(251, 191, 36, 0.3)",
                          "0 0 0px rgba(251, 191, 36, 0)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <span className="text-yellow-400">Harsh's</span> EmoAI is
                      ready to assist you!
                    </motion.span>
                  </motion.h2>
                </motion.div>

                {/* Feature showcase */}
                <div className="relative w-full max-w-2xl h-48 mb-12">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-lg border ${
                        activeFeature === index
                          ? "border-yellow-400"
                          : "border-gray-700"
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{
                        opacity: activeFeature === index ? 1 : 0,
                        x: activeFeature === index ? 0 : 50,
                        zIndex: activeFeature === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex flex-col items-center text-center h-full justify-center">
                        <motion.span className="text-4xl mb-4">
                          {feature.icon}
                        </motion.span>
                        <h3 className="text-xl font-bold text-yellow-400 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Interactive dots for features */}
                <div className="flex gap-2 mb-12">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeFeature === index
                          ? "bg-yellow-400 scale-125"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Premium Start Button */}
                <motion.div
                  className="w-full max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={popupcontroller}
                    className="cursor-pointer w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl
          shadow-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <motion.div />
                    <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
                    Start Conversation
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </motion.button>
                </motion.div>

                {/* Footer note */}
                <motion.div
                  className="absolute bottom-4 text-gray-300 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  AI Powered by{" "}
                  <span className="text-yellow-400">
                    <a href="https://endgamingwithharsh.netlify.app/">
                      EndGaming
                    </a>
                  </span>{" "}
                  • {new Date().getFullYear()}
                </motion.div>
              </div>
            ) : (
              <ChatUI />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
