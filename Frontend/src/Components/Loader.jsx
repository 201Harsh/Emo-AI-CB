import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaBrain } from "react-icons/fa";

const EmoAIPreloader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const controls = useAnimation();
  const textControls = useAnimation();

  // Prompts that will cycle through
  const prompts = [
    "EmoAI: Activating neural matrix...",
    "EmoAI: Loading emotion protocols...",
    "EmoAI: Synchronizing cognitive layers...",
  ];

  const energyVariants = {
    initial: { scaleY: 0, originY: 0 },
    flowing: {
      scaleY: 1,
      transition: {
        duration: 3.5,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const sparkVariants = {
    falling: (i) => ({
      y: ["0%", "100%"],
      opacity: [0.8, 0],
      transition: {
        delay: 0.5 + i * 0.3,
        duration: 1.5 + Math.random(),
        repeat: Infinity,
        repeatDelay: 3 + Math.random() * 4,
      },
    }),
    burst: {
      scale: [1, 1.5, 1],
      opacity: [0, 0.7, 0],
      transition: { duration: 0.8 },
    },
  };

  useEffect(() => {
    controls.start("flowing");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            textControls.start({
              opacity: 0,
              transition: { duration: 0.5 },
            });
            setTimeout(onFinish, 500);
          }, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const sequence = async () => {
      await textControls.start({ opacity: 1, y: 0 }, { delay: 0.1 });
      await textControls.start({
        scale: 1.05,
        transition: { repeat: Infinity, repeatType: "reverse", duration: 0.3 },
      });
    };
    sequence();

    return () => clearInterval(interval);
  }, [controls, textControls, onFinish]);

  useEffect(() => {
    const promptInterval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 1500);

    return () => clearInterval(promptInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMxMDAwMDAiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10" />

      <motion.div
        className="absolute top-0 left-0 w-full h-full origin-top"
        variants={energyVariants}
        initial="initial"
        animate="controls"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(120, 80, 0, 0.9) 0%, 
            rgba(100, 70, 0, 0.95) 30%, 
            rgba(80, 60, 0, 1) 70%)`,
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.7)",
          filter: "blur(0.5px)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full bg-amber-500/20"
              style={{
                width: `${2 + Math.random() * 3}px`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ y: -100 }}
              animate={{
                y: "100%",
                transition: {
                  delay: 0.5 + i * 0.2,
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <React.Fragment key={i}>
            <motion.div
              className="absolute top-0 text-amber-400"
              style={{
                left: `${5 + Math.random() * 90}%`,
                fontSize: `${8 + Math.random() * 10}px`,
              }}
              variants={sparkVariants}
              custom={i}
              animate="falling"
            />
            <motion.div
              className="absolute bottom-0 text-amber-300 opacity-0"
              style={{
                left: `${5 + Math.random() * 90}%`,
                fontSize: `${15 + Math.random() * 20}px`,
              }}
              variants={sparkVariants}
              animate="burst"
            />
          </React.Fragment>
        ))}
      </div>

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, transparent 70%, #440 100%)",
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={textControls}
      >
        <div className="relative z-10 text-center">
          <motion.div
            className="flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <FaBrain className="text-amber-400 text-5xl mr-3" />
            </motion.div>
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="text-white">Emo</span>
              <motion.span
                className="text-amber-400"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(245,158,11,0.5)",
                    "0 0 20px rgba(245,158,11,0.8)",
                    "0 0 5px rgba(245,158,11,0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                AI
              </motion.span>
            </h1>
          </motion.div>

          <motion.div
            className="mt-4 text-xl text-amber-300 max-w-md mx-auto h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {prompts.map((prompt, index) => (
              <motion.div
                key={prompt}
                className="absolute w-full text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: currentPromptIndex === index ? 1 : 0,
                  y: currentPromptIndex === index ? 0 : 10,
                }}
                transition={{ duration: 0.5 }}
              >
                {prompt}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 h-2 bg-gray-800 rounded-full overflow-hidden max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "0 0 10px rgba(245,158,11,0.7)",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-amber-400 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-6xl font-bold">{progress}%</div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.03, 0, 0.01, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.05, 0.06, 0.07, 1],
        }}
      />
    </div>
  );
};

export default EmoAIPreloader;