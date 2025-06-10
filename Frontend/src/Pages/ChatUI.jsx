import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import AxiosInstance from "../Config/Axios";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [IsRes, setIsRes] = useState(false);
  const [chatHistorySave, setchatHistorySave] = useState([]);

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
      // Match markdown and anchor tags
      const regex =
        /(<a href="[^"]+"[^>]*>[^<]+<\/a>|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|"[^"]*")/g;

      const parts = line.split(regex).map((part, partIndex) => {
        const key = `${lineIndex}-${partIndex}`;

        if (part === "*[object Object]*") {
          return <span key={key} className="hidden" />;
        }

        // Handle anchor tag
        if (part.startsWith("<a ") && part.includes("</a>")) {
          const match = part.match(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/);
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

        // Bold + italic
        if (part.startsWith("***") && part.endsWith("***")) {
          return (
            <span
              key={key}
              className="font-bold italic text-gray-950 text-sm md:text-lg block"
            >
              {part.slice(3, -3)}
            </span>
          );
        }

        // Bold
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span
              key={key}
              className="font-bold text-gray-950 text-sm md:text-lg block mb-2"
            >
              {part.slice(2, -2)}
            </span>
          );
        }

        // Italic
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={key} className="text-black font-semibold">
              {part.slice(1, -1)}
            </span>
          );
        }

        // Quoted
        if (part.startsWith('"') && part.endsWith('"')) {
          return (
            <span key={key} className="text-gray-800 font-semibold">
              {part.slice(1, -1)}
            </span>
          );
        }

        // Default
        return part;
      });

      return <p key={lineIndex}>{parts}</p>;
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
              } flex flex-col justify-start items-start rounded-xl`}
            >
              {formatMessage(message.text)}
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
