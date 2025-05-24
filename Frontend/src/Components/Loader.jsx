import { motion } from "framer-motion";
import { CpuChipIcon, SparklesIcon } from "@heroicons/react/24/outline";

const Loader = () => {

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`grid-${i}`}
            className="absolute border border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Holographic logo with circuit-like animation */}
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 5, -5, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <motion.div
            className="rounded-full p-3 bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 relative overflow-hidden"
            style={{
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)",
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <CpuChipIcon className="h-12 w-12 text-gray-900" />
          </motion.div>

          {/* Holographic rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-yellow-400 opacity-70"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              top: "-10px",
              left: "-10px",
              right: "-10px",
              bottom: "-10px",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-500 opacity-50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
            style={{
              top: "-15px",
              left: "-15px",
              right: "-15px",
              bottom: "-15px",
            }}
          />
        </motion.div>

        {/* Text with digital glitch effect */}
        <motion.div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-2 relative"
          >
            EmoAI ChatBot
            {/* Glitch effect */}
            <motion.span
              className="absolute left-0 top-0 bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.1, 0],
                x: [-2, 2, -1, 1, 0],
                y: [-1, 1, -0.5, 0.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              EmoAI ChatBot
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-center font-poppins font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6 relative"
          >
            Powered By EndGaming AI
            {/* Glitch effect */}
            <motion.span
              className="absolute left-0 top-0 bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 0.1, 0],
                x: [-1, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.5,
              }}
            >
              Powered By EndGaming AI
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Loading text with digital effect */}
        <motion.div
          className="text-gray-300 text-lg flex items-center gap-1 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>SYSTEM INITIALIZATION</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatDelay: 0,
              times: [0, 0.5, 1],
            }}
          >
            _
          </motion.span>
        </motion.div>

        {/* Futuristic progress bar */}
        <motion.div
          className="h-2 bg-gray-800 rounded-full w-72 mt-8 overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: "90%" }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
            }}
            style={{
              boxShadow: "0 0 10px rgba(251, 191, 36, 0.7)",
            }}
          >
            {/* Scanning effect */}
            <motion.div
              className="absolute right-0 top-0 h-full w-1 bg-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                left: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Connection status */}
        <motion.div
          className="mt-4 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-green-400 mr-2"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: ["0 0 0 rgba(74, 222, 128, 0)", "0 0 10px rgba(74, 222, 128, 0.7)", "0 0 0 rgba(74, 222, 128, 0)"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <span className="text-gray-300 text-sm font-mono">CONNECTING TO NEURAL NETWORK</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;