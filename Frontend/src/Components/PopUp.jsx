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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-gray-950/70"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              aria-label="Close popup"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Profile Photo */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 p-1 mb-2">
                <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                  <img
                    src="https://avatars.githubusercontent.com/u/160850571?v=4"
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Custom Content or Default */}
              {children || (
                <>
                  <h3 className="text-xl font-bold text-yellow-400">
                    {title}
                  </h3>
                  <p className="text-gray-400">
                    {message}
                  </p>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 w-full">
                {buttons.length === 0 ? (
                  <>
                    <a
                      href="https://www.instagram.com/201harshs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center py-3 px-4 bg-gradient-to-br from-amber-600 to-yellow-900 rounded-lg hover:opacity-90 transition text-white"
                    >
                      Follow Me
                    </a>
                    <button
                      onClick={onClose}
                      className="flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition bg-gray-800 hover:bg-gray-700 text-gray-300"
                    >
                      Follow Later
                    </button>
                  </>
                ) : (
                  buttons.map((button, index) => (
                    <button
                      key={index}
                      onClick={button.onClick}
                      className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition ${
                        button.type === "primary"
                          ? "bg-gradient-to-br from-amber-500 to-yellow-600 hover:opacity-90 text-white"
                          : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                      }`}
                    >
                      {button.label}
                    </button>
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