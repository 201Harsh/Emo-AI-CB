import { motion, useAnimation } from "framer-motion";
import { CpuChipIcon, ServerIcon, CodeBracketIcon, WifiIcon, BoltIcon, CubeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Loader = () => {
  const [bootProgress, setBootProgress] = useState(0);
  const controls = useAnimation();

  const bootStages = [
    { text: "Activating neural matrix...", percent: 10 },
    { text: "Booting quantum processors...", percent: 25 },
    { text: "Initializing cognitive layers...", percent: 40 },
    { text: "Loading emotion protocols...", percent: 55 },
    { text: "Establishing quantum link...", percent: 70 },
    { text: "Synchronizing with EndGaming AI...", percent: 85 },
    { text: "AI engine ready", percent: 100 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress(prev => {
        const next = prev + 1;
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 45); // ~4.5 second total duration

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bootProgress >= 100) {
      controls.start("complete");
    }
  }, [bootProgress, controls]);

  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Holographic grid background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`grid-${i}`}
            className="absolute border border-amber-400/5"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.15, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
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

      {/* Binary particle background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute text-xs font-mono text-green-400"
            initial={{
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>

      {/* Main header */}
      <motion.div 
        className="w-full max-w-3xl mb-8 text-center relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute -inset-4 bg-amber-400/10 blur-xl rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ delay: 0.3, duration: 1 }}
        />
        
        <motion.h1
          className="text-5xl h-14 font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-3 relative"
          initial={{ opacity: 0, letterSpacing: "-0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0em" }}
          transition={{ delay: 0.2, duration: 0.8, ease: "backOut" }}
        >
          EmoAI Engine
          <motion.span
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-amber-400 to-green-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </motion.h1>
        
        <motion.div
          className="text-xl text-amber-300 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
           
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <WifiIcon className="w-6 h-6 mr-3" />
          </motion.div>
          <span>Connecting to EndGaming AI</span>
        </motion.div>
      </motion.div>

      {/* Main terminal */}
      <motion.div 
        className="w-full max-w-3xl bg-gray-900/80 backdrop-blur-sm border border-amber-400/20 rounded-xl overflow-hidden shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Terminal glow */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-green-400/20 blur-sm rounded-lg"
          animate={{
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />

        {/* Terminal header */}
        <div className="flex items-center px-5 py-3.5 bg-gray-800/70 border-b border-amber-400/20">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm shadow-red-400/50" />
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
            <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
          </div>
          <div className="text-sm font-mono text-amber-300 flex items-center">
            <BoltIcon className="w-4 h-4 mr-2 animate-pulse" />
            <span>AI_ENGINE_BOOT_SEQUENCE</span>
          </div>
          <div className="ml-auto hidden md:block text-xs text-gray-400 font-mono">
            v5.3.8.Neural
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono">
          {/* System status grid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-800/50 p-3 rounded border border-amber-400/10">
              <div className="text-xs text-amber-400 mb-1">NEURAL CORES</div>
              <div className="text-lg text-green-400 font-bold">24/24</div>
              <div className="h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.4, duration: 1 }}
                />
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded border border-green-400/10">
              <div className="text-xs text-green-400 mb-1">MEMORY MATRIX</div>
              <div className="text-lg text-amber-400 font-bold">128PB</div>
              <div className="h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 1 }}
                />
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-3 rounded border border-amber-400/10">
              <div className="text-xs text-amber-400 mb-1">QUANTUM LINK</div>
              <div className="text-lg text-green-400 font-bold">87%</div>
              <div className="h-1.5 bg-gray-700 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-400 to-green-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "87%" }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-amber-300 mb-2">
              <div className="flex items-center">
                <CubeIcon className="w-3 h-3 mr-1.5" />
                <span>SYSTEM INITIALIZATION</span>
              </div>
              <span className="font-bold">{bootProgress}%</span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-green-400 to-green-500 rounded-full absolute"
                style={{ width: `${bootProgress}%` }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-1 bg-white opacity-0"
                animate={{
                  opacity: [0, 0.8, 0],
                  left: ["0%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              />
            </div>
          </div>

          {/* Boot stages */}
          <div className="space-y-2 mb-6">
            {bootStages.map((stage, i) => (
              <motion.div
                key={`stage-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: bootProgress >= stage.percent ? 1 : 0.2,
                  x: 0,
                  color: bootProgress >= stage.percent ? "#f3f4f6" : "#4b5563"
                }}
                className="flex items-start"
              >
                <motion.span
                  className={`text-sm mr-3 ${
                    bootProgress >= stage.percent ? "text-green-400" : "text-amber-400/50"
                  }`}
                  animate={{
                    scale: bootProgress >= stage.percent ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1
                  }}
                >
                  {bootProgress >= stage.percent ? "✓" : ">"}
                </motion.span>
                <div className="flex-1">
                  <div className="text-sm">
                    {stage.text}
                    {i === bootStages.length - 1 && bootProgress >= 100 && (
                      <motion.span
                        className="ml-1.5 inline-block"
                        animate={{ opacity: [0, 1] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        _
                      </motion.span>
                    )}
                  </div>
                  {bootProgress >= stage.percent && (
                    <motion.div
                      className="h-px bg-gradient-to-r from-amber-400/30 to-transparent mt-1"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* System visualization */}
          <motion.div
            className="mt-6 pt-5 border-t border-amber-400/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex justify-between items-center">
              {/* EmoAI Core */}
              <motion.div 
                className="flex flex-col items-center"
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-2 relative shadow-lg shadow-amber-400/20"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 10px rgba(245, 158, 11, 0.3)",
                      "0 0 20px rgba(245, 158, 11, 0.5)",
                      "0 0 10px rgba(245, 158, 11, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  <CpuChipIcon className="w-8 h-8 text-gray-900" />
                  {/* Energy pulses */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`pulse-${i}`}
                      className="absolute inset-0 rounded-full border border-amber-400/40"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </motion.div>
                <div className="text-xs mt-1 font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  EMOAI_CORE
                </div>
              </motion.div>

              {/* Connection animation */}
              <motion.div 
                className="flex-1 px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="relative h-1 bg-gradient-to-r from-amber-400/20 to-green-400/20 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.8, duration: 1.5 }}
                  />
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`conn-${i}`}
                      className="absolute top-0 h-full w-2 bg-white rounded-full"
                      initial={{ left: "0%", opacity: 0 }}
                      animate={{ left: "100%", opacity: [0, 0.8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 2 + i * 0.4,
                        ease: "linear"
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="text-center mt-3 text-xs text-green-400 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  CONNECTION ESTABLISHED
                </motion.div>
              </motion.div>

              {/* EndGaming Server */}
              <motion.div
                className="flex flex-col items-center"
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              >
                <motion.div
                  className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-green-900 flex items-center justify-center mb-2 border border-green-400/30 shadow-lg shadow-green-400/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <ServerIcon className="w-8 h-8 text-green-400" />
                  {/* Active pulses */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-green-400/30"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: [0, 0.3, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 2.5
                    }}
                  />
                </motion.div>
                <div className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                  ENDGAMING_AI
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Final status */}
          <motion.div
            className="mt-6 pt-5 border-t border-amber-400/10 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: bootProgress >= 100 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-green-400 mr-3"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 rgba(74, 222, 128, 0)",
                  "0 0 10px rgba(74, 222, 128, 0.8)",
                  "0 0 0 rgba(74, 222, 128, 0)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
            <div className="flex-1">
              <div className="text-green-400 font-bold">AI ENGINE ONLINE</div>
              <div className="text-xs text-amber-400">All systems operational</div>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {bootProgress >= 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  READY
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating tech elements */}
      <motion.div
        className="absolute hidden md:block bottom-10 left-10 text-xs text-amber-400/50 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div>QUANTUM_ARCH v3.4</div>
        <div>NEURAL_API active</div>
      </motion.div>
      
      <motion.div
        className="absolute hidden md:block bottom-10 right-10 text-xs text-green-400/50 font-mono text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div>CONNECTION: SECURE</div>
        <div>ENCRYPTION: 256Q</div>
      </motion.div>
    </div>
  );
};

export default Loader;