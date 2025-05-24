import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const PopUp = ({ isOpen, onClose, title, message, buttons = [], children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border-2 border-yellow-400 relative transform transition-all scale-95 animate-popup-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-yellow-400 hover:text-yellow-500 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          {/* Custom Icon/Header */}
          {children || (
            <>
              <h2 className="text-2xl font-bold text-yellow-400">{title}</h2>
              <p className="text-gray-300">{message}</p>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 md:gap-5 mt-6">
            {buttons.length === 0 ? (
              <div className="flex gap-4">
                <a
                  onClick={onClose}
                  href="https://www.instagram.com/201harshs/"
                >
                  <button className="glowing border-2 border-amber-400 cursor-pointer text-yellow-400 font-bold py-2 px-6 rounded-lg transition-all duration-200">
                    Follow Me
                  </button>
                </a>
                <button
                  onClick={onClose}
                  className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-gray-900 font-medium py-2 px-6 rounded-lg transition-all duration-200"
                >
                  Follow Later
                </button>
              </div>
            ) : (
              buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`${
                    button.type === "primary"
                      ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  } font-bold py-2 px-6 rounded-lg transition-all duration-200`}
                >
                  {button.label}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
