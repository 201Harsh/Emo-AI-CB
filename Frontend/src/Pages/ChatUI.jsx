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
    // If already speaking and same message, stop
    if (isSpeaking && currentSpeakingIndex === index) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingIndex(null);
      return;
    }

    // If speaking another message, cancel it first
    if (isSpeaking) {
      speechSynthesis.cancel();
      setTimeout(() => speakText(text, index), 150); // Delay to let cancel register
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

  // Format the AI response to show highlighted text
  const formatMessage = (message) => {
  const safeMessage = String(message);

  return safeMessage.split("\n").map((line, lineIndex) => {
    // Skip empty lines
    if (line.trim() === '') return null;

    // Match markdown, anchor tags, and emojis
    const regex =
      /(<a\s+[^>]*href="[^"]*"[^>]*>.*?<\/a>|\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|".*?"|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/gu;

    const parts = line.split(regex).filter(Boolean).map((part, partIndex) => {
      const key = `${lineIndex}-${partIndex}`;

      if (part === "*[object Object]*") {
        return (
          <span key={key} className="hidden">
            {/* Hides the object */}
          </span>
        );
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
            className="text-blue-600 m-1 underline font-semibold hover:text-blue-900"
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
              className="text-blue-600 underline font-semibold hover:text-blue-900"
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
            className="font-bold italic text-gray-950 text-sm md:text-lg inline"
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
            className="font-bold text-gray-950 text-sm md:text-lg inline"
          >
            {part.slice(2, -2)}
          </span>
        );
      }

      // Italic (*text*)
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={key} className="italic text-black font-semibold inline">
            {part.slice(1, -1)}
          </span>
        );
      }

      // Quoted ("text")
      if (part.startsWith('"') && part.endsWith('"')) {
        return (
          <span key={key} className="text-gray-800 italic inline">
            {part}
          </span>
        );
      }

      // Emoji handling (keep as is)
      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
      if (emojiRegex.test(part)) {
        return <span key={key}>{part}</span>;
      }

      // Default text
      return <span key={key}>{part}</span>;
    });

    return (
      <p key={lineIndex} className="mb-2 text-xs md:text-sm leading-relaxed">
        {parts}
      </p>
    );
  });
};

  return (
    <div className="h-full font-poppins flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900/50 pt-2">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto chat-box p-2 md:p-7 space-y-3 pt-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 min-w-20 max-w-[85%] md:text-sm text-xs ${
                message.sender === "user"
                  ? "bg-gray-700 text-yellow-400 rounded-tr-none"
                  : "bg-gray-300 text-gray-900 rounded-tl-none"
              } flex flex-col justify-start items-start rounded-xl relative`}
            >
              {formatMessage(message.text)}
              {message.sender === "ai" && (
                <button
                  onClick={() => handleSpeak(message.text, index)}
                  className={`absolute right-2 top-2 p-1 rounded-full ${
                    isSpeaking && currentSpeakingIndex === index
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-gray-700 text-yellow-400"
                  }`}
                  aria-label={
                    isSpeaking && currentSpeakingIndex === index
                      ? "Stop speaking"
                      : "Speak"
                  }
                >
                  {isSpeaking && currentSpeakingIndex === index ? (
                    <StopIcon className="h-4 w-4" />
                  ) : (
                    <SpeakerWaveIcon className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start w-full">
            <div className="p-3 min-w-20 max-w-[85%] bg-gray-300 text-gray-900 rounded-tl-none rounded-xl">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-yellow-400/20 p-3 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <form
            className="flex flex-1 items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              autoFocus
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message EmoAI..."
              className="flex-1 bg-gray-800 text-yellow-400 rounded-lg px-3 py-2 border border-yellow-400 
                     focus:outline-none focus:ring-1 focus:ring-yellow-500
                     placeholder:text-yellow-400/50 text-sm"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 
                    rounded-lg transition duration-200 flex items-center justify-center
                    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !inputMessage.trim()}
            >
              <PaperAirplaneIcon className="h-4 w-4 rotate-[-40deg]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
