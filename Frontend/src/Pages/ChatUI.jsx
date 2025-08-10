import { useState, useEffect, useRef } from "react";
import {
  PaperAirplaneIcon,
  SpeakerWaveIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [IsRes, setIsRes] = useState(false);
  const [chatHistorySave, setchatHistorySave] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState(null);
  const [companionType, setCompanionType] = useState("default");
  const [voices, setVoices] = useState([]);
  const speechSynthesis = window.speechSynthesis;

  // Load messages and chat history from localStorage on component mount
  useEffect(() => {
    const loadChatData = () => {
      try {
        // Load regular messages
        const savedMessages = localStorage.getItem("chat_messages");
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        }

        // Load chat history
        const savedChatHistory = localStorage.getItem("chat_history");
        if (savedChatHistory) {
          setchatHistorySave(JSON.parse(savedChatHistory));
        }

        // Load AI Companion type
        const savedCompanion = localStorage.getItem("AICompanion");
        if (savedCompanion) {
          setCompanionType(savedCompanion);
        }
      } catch (error) {
        console.error("Error loading chat data from localStorage:", error);
        toast.error("Failed to load chat history", {
          position: "bottom-left",
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
    };

    loadChatData();

    // Load voices when they become available
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          setVoices(speechSynthesis.getVoices());
        };
      }
    };

    loadVoices();

    // Clean up speech synthesis when component unmounts
    return () => {
      speechSynthesis.onvoiceschanged = null;
      speechSynthesis.cancel();
    };
  }, []);

  // Save messages and chat history to localStorage when they change
  useEffect(() => {
    const saveChatData = () => {
      try {
        if (messages.length > 0) {
          const limitedMessages = messages.slice(-50);
          localStorage.setItem(
            "chat_messages",
            JSON.stringify(limitedMessages)
          );
        }
      } catch (error) {
        console.error("Error saving chat data to localStorage:", error);
      }
    };

    saveChatData();
  }, [messages, chatHistorySave]);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSpeak = (text, index) => {
    if (isSpeaking && currentSpeakingIndex === index) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
      return;
    }

    if (isSpeaking) {
      speechSynthesis.cancel();
      setTimeout(() => speakText(text, index), 150);
    } else {
      speakText(text, index);
    }
  };

  const speakText = (text, index) => {
    let cleanedText = text.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );

    const headerRegex =
      /^\*{3}EndGaming AI v[\d.]+(?:\s*\(.*?\))?\*{3}\s*\n\*{2}Harsh's EmoAI Assistant\*{2}\s*\n*/i;
    cleanedText = cleanedText.replace(headerRegex, "").trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);

    // Voice selection
    let selectedVoice = null;
    if (voices.length > 0) {
      if (companionType === "girlfriend") {
        selectedVoice = voices.find((voice) =>
          ["female", "woman", "girl", "samantha", "zira"].some((v) =>
            voice.name.toLowerCase().includes(v)
          )
        );
        if (selectedVoice) {
          utterance.rate = 1.1;
          utterance.pitch = 1.2;
          utterance.volume = 1.0;
        }
      } else if (companionType === "boyfriend") {
        selectedVoice = voices.find((voice) =>
          ["male", "man", "david", "alex"].some((v) =>
            voice.name.toLowerCase().includes(v)
          )
        );
        if (selectedVoice) {
          utterance.rate = 0.9;
          utterance.pitch = 0.8;
          utterance.volume = 1.0;
        }
      }

      if (!selectedVoice) {
        selectedVoice = voices[0];
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
      }

      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang || "en-US";
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingIndex(index);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
    };

    utterance.onerror = (event) => {
      if (event.error !== "interrupted") {
        toast.error(`Voice playback failed: ${event.error}`, {
          position: "bottom-left",
          autoClose: 3000,
          theme: "dark",
        });
      }

      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
    };

    speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      sender: "user",
      text: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await AxiosInstance.post("/ai/EmoAI", {
        prompt: inputMessage,
      });

      if (response.status === 200) {
        setIsRes(true);
        const aiMessage = {
          sender: "ai",
          text: response.data.response,
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Save to chat history
        const completedChat = {
          user: inputMessage,
          ai: response.data.response,
          timestamp: new Date().toISOString(),
        };

        setchatHistorySave((prevHistory) => {
          const updatedHistory = [...prevHistory, completedChat];
          return updatedHistory;
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.response?.data?.error || "Failed to get response from AI",
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );

      // Add error message to chat
      const errorMessage = {
        sender: "ai",
        text: "Sorry, I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (IsRes) {
      localStorage.setItem("responseornot", true);
    }
  }, [IsRes]);

  const formatMessage = (message) => {
    const safeMessage = String(message);

    return safeMessage.split("\n").map((line, lineIndex) => {
      if (line.trim() === '') return null;

      const regex =
        /(<a\s+[^>]*href="[^"]*"[^>]*>.*?<\/a>|\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|".*?"|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/gu;

      const parts = line.split(regex).filter(Boolean).map((part, partIndex) => {
        const key = `${lineIndex}-${partIndex}`;

        if (part === "*[object Object]*") {
          return <span key={key} className="hidden"></span>;
        }

        // Handle markdown-style links [text](url)
        const markdownLinkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
        if (markdownLinkMatch) {
          const [, text, url] = markdownLinkMatch;
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 m-1 underline font-semibold hover:text-yellow-200 transition-colors"
            >
              {text}
            </a>
          );
        }

        // Handle anchor tag
        if (part.startsWith("<a ") && part.includes("</a>")) {
          const match = part.match(/<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/i);
          if (match) {
            const [, href, text] = match;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline font-semibold hover:text-yellow-200 transition-colors"
              >
                {text}
              </a>
            );
          }
        }

        // Bold + italic (***text***)
        if (part.startsWith("***") && part.endsWith("***")) {
          return (
            <span
              key={key}
              className="font-bold italic text-yellow-100 text-sm md:text-base inline"
            >
              {part.slice(3, -3)}
            </span>
          );
        }

        // Bold (**text**)
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span
              key={key}
              className="font-bold text-yellow-100 text-sm md:text-base inline"
            >
              {part.slice(2, -2)}
            </span>
          );
        }

        // Italic (*text*)
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={key} className="italic text-yellow-50 font-medium inline">
              {part.slice(1, -1)}
            </span>
          );
        }

        // Quoted ("text")
        if (part.startsWith('"') && part.endsWith('"')) {
          return (
            <span key={key} className="text-yellow-200 italic inline">
              {part}
            </span>
          );
        }

        // Emoji handling
        const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
        if (emojiRegex.test(part)) {
          return <span key={key}>{part}</span>;
        }

        // Default text
        return <span key={key}>{part}</span>;
      });

      return (
        <p key={lineIndex} className="mb-2 text-sm md:text-base leading-relaxed">
          {parts}
        </p>
      );
    });
  };

  return (
    <div className="h-full font-poppins flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900/30">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 scrollbar-thin scrollbar-thumb-yellow-600/50 scrollbar-track-gray-800/50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="bg-yellow-900/20 p-6 rounded-xl max-w-md border border-yellow-800/50 backdrop-blur-sm">
              <h3 className="text-yellow-400 text-xl font-bold mb-3">Welcome to EmoAI</h3>
              <p className="text-yellow-200/90 text-sm md:text-base">
                Start a conversation by typing a message below. I'm here to chat about anything!
              </p>
              <div className="mt-4 flex justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-600"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full transition-all duration-200 ease-out ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-4 max-w-[90%] md:max-w-[80%] text-sm md:text-base ${
                message.sender === "user"
                  ? "bg-gradient-to-br from-yellow-700 to-yellow-800 text-yellow-50 rounded-tr-none rounded-bl-xl shadow-lg shadow-yellow-900/20"
                  : "bg-gray-800/90 text-yellow-100 rounded-tl-none rounded-br-xl shadow-lg shadow-gray-900/20"
              } flex flex-col justify-start items-start rounded-xl relative group`}
            >
              {formatMessage(message.text)}
              {message.sender === "ai" && (
                <button
                  onClick={() => handleSpeak(message.text, index)}
                  className={`absolute -right-2 -top-2 p-2 rounded-full transition-all ${
                    isSpeaking && currentSpeakingIndex === index
                      ? "bg-yellow-500 text-gray-900 shadow-md shadow-yellow-500/50"
                      : "bg-gray-700/90 text-yellow-400 hover:bg-gray-600 hover:text-yellow-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                  }`}
                  aria-label={
                    isSpeaking && currentSpeakingIndex === index
                      ? "Stop speaking"
                      : "Speak"
                  }
                >
                  {isSpeaking && currentSpeakingIndex === index ? (
                    <StopIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  ) : (
                    <SpeakerWaveIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start w-full animate-pulse">
            <div className="p-4 max-w-[85%] bg-gray-800/90 text-yellow-100 rounded-tl-none rounded-br-xl shadow-lg shadow-gray-900/20">
              <div className="flex space-x-3 items-center">
                <div className="flex space-x-1.5">
                  <div
                    className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-yellow-600 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <span className="text-yellow-300 text-sm">EmoAI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Message Input */}
      <div className="border-t border-yellow-400/20 p-4 bg-gray-900/80 backdrop-blur-sm">
        <form
          className="flex items-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            autoFocus
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/70 text-yellow-50 rounded-xl px-4 py-3 border border-yellow-800/50 
                   focus:outline-none focus:ring-2 focus:ring-yellow-600/50 focus:border-yellow-600
                   placeholder:text-yellow-400/50 text-sm md:text-base transition-all duration-200
                   hover:border-yellow-600/50 shadow-inner shadow-gray-900/50"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 
                  text-gray-900 px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-center
                  active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-yellow-500/30
                  focus:ring-2 focus:ring-yellow-500/50 focus:outline-none min-w-[44px] min-h-[44px]"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-[-40deg] transform transition-transform duration-200 hover:rotate-0" />
          </button>
        </form>
        <p className="text-xs text-yellow-600/70 text-center mt-2">
          EmoAI may produce inaccurate information
        </p>
      </div>
    </div>
  );
};

export default ChatUI;