import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const PopUp = ({ isOpen, onClose, title, message, buttons = [], children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-600 relative shadow-xl"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.button>

            {/* Content */}
            <div className="text-center space-y-5">
              {/* Custom Icon/Header */}
              {children || (
                <>
                  <h2 className="text-2xl font-semibold text-yellow-400">
                    {title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {message}
                  </p>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-6">
                {buttons.length === 0 ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="bg-transparent border border-gray-500 text-gray-300 hover:bg-gray-700 hover:border-gray-400 font-medium py-2 px-5 rounded-lg text-sm transition-colors"
                    >
                      Follow Later
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://www.instagram.com/201harshs/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button onClick={onClose} className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-medium py-2 px-5 rounded-lg text-sm shadow-md hover:shadow-lg transition-all">
                        Follow Me
                      </button>
                    </motion.a>
                  </>
                ) : (
                  buttons.map((button, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={button.onClick}
                      className={`${
                        button.type === "primary"
                          ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      } font-medium py-2 px-5 rounded-lg text-sm transition-all shadow-sm`}
                    >
                      {button.label}
                    </motion.button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopUp;
