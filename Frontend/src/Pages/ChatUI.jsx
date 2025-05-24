import { useState } from "react";
import {
  PaperAirplaneIcon,
  SpeakerWaveIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "Ai" },
    { text: "Hi there! I have a question.", sender: "user" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const formatMessage = (text) => {
    return text.split("\n").map((line, i) => (
      <p key={i} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks for your message! This is a simulated response.Please let me know if you have any additional questions.",
            sender: "Ai",
          },
        ]);
      }, 1000);
    }
  };

  const toggleSpeech = (text) => {
    setIsSpeaking(!isSpeaking);
    // Speech functionality would go here in a real implementation
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl ${
                message.sender === "user"
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-300 text-gray-900"
              }`}
            >
              <div className="relative">
                {message.sender === "Ai" && (
                  <button
                    onClick={() => toggleSpeech(message.text)}
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow"
                  >
                    {isSpeaking ? (
                      <StopCircleIcon className="h-5 w-5 text-black" />
                    ) : (
                      <SpeakerWaveIcon className="h-5 w-5 text-black" />
                    )}
                  </button>
                )}
                {formatMessage(message.text)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-yellow-400/20 p-4 bg-gray-900/80">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-yellow-400 rounded-lg px-4 py-2 border border-yellow-400/50 focus:outline-none focus:ring-1 focus:ring-yellow-500 placeholder-yellow-400/50"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg transition"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-[-40deg]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
