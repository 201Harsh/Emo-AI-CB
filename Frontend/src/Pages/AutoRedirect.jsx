import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Start from "../Pages/Start";
import { motion } from "framer-motion";

const AutoRedirect = () => {
  const navigate = useNavigate();
  const [showPreloader, setShowPreloader] = useState(true);
  const [Istoken, setIstoken] = useState(false);

  // Component for animated percentage
  const AnimatedPercentage = () => {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setPercentage((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 200);
      return () => clearInterval(interval);
    }, []);

    return <span>{percentage}%</span>;
  };

  // Component for cycling status messages
  const AnimatedStatusMessages = () => {
    const messages = [
      "Authenticating credentials...",
      "Establishing secure connection...",
      "Loading emotional models...",
      "Almost there...",
      "Connecting to server...",
      "Finalizing setup...",
    ];
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    return <span>{messages[currentMessage]}</span>;
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowPreloader(false);
      if (token) {
        navigate("/home");
      } else {
        // setIstoken(true);
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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 space-y-8 p-4">
      {/* EmoAI Branding with Framer Motion */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-12"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <div className="shadow-lg rounded-full p-2 bg-gradient-to-br from-yellow-400 to-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-gray-900"
            >
              <path d="M16.5 7.5h-9v9h9v-9z" />
              <path
                fillRule="evenodd"
                d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
            EmoAI
          </span>
        </motion.div>
      </motion.div>

      {/* Animated Loader System */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center space-y-8 w-full max-w-md"
      >
        {/* Triple Ring Spinner */}
        <div className="relative h-28 w-28">
          {/* Outer glow ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400/30 border-r-yellow-400/30"
          ></motion.div>

          {/* Middle spinning ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-amber-500/50 border-l-amber-500/50"
          ></motion.div>

          {/* Inner core with animated emoji */}
          <div className="absolute inset-6 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-4xl"
            >
              🤖
            </motion.div>
          </div>
        </div>

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4 w-full"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-amber-500">
            Connecting to EmoAI Server
          </h1>
          <p className="text-gray-400 text-lg flex items-center justify-center space-x-2">
            {[..."ooo"].map((dot, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {dot}
              </motion.span>
            ))}
          </p>
        </motion.div>

        {/* Enhanced Progress Bar System */}
        <div className="w-full space-y-2">
          {/* Progress percentage text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-between text-sm text-amber-100/80"
          >
            <span>Establishing connection...</span>
            <motion.span
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <AnimatedPercentage />
            </motion.span>
          </motion.div>

          {/* Main progress bar */}
          <div className="h-2.5 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 rounded-full relative"
            >
              {/* Progress bar shimmer effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 h-full w-20 bg-white/20 skew-x-[-20deg]"
              />
            </motion.div>
          </div>

          {/* Status messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-amber-100/50 flex justify-end"
          >
            <AnimatedStatusMessages />
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-amber-100/70 text-sm"
      >
        Powered by <span className="text-yellow-400">Endgaming AI</span>
      </motion.div>
    </div>
  ) : null;
};

export default AutoRedirect;
