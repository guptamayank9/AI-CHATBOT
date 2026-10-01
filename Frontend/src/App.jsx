import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
  const savedMessages = localStorage.getItem("chatMessages");

  return savedMessages ? JSON.parse(savedMessages) : [];
});
  const [isTyping, setIsTyping] = useState(false);

  //this is for auto scroll the mssg
  const messagesEndRef = useRef(null);

  const socketRef = useRef(null);

  //socket connection
  useEffect(() => {
    // Backend Socket.IO server se connect
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL);

    //Connection successful hua
    socketRef.current.on("connect", () => {
      console.log("Connected to server : ", socketRef.current.id);
    });

    socketRef.current.on("ai-typing", () => {
      setIsTyping(true);
    });

    //Backend se AI response receive
    socketRef.current.on("ai-response", (data) => {
      setIsTyping(false);

      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    });
    //cleanup
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  //auto scroll
  //mssg change hone par scroll so we use new useEffect
  //[messages]===>chat ko latest message tak le jayega.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  

 

  const handleSend = () => {
    // Empty message ya AI response generate ho raha ho
    if (!message.trim() || isTyping) {
      return;
    }
    // User message object

    const newMessage = {
      role: "user",
      content: message,
    };

    //old messgs ..prevMessages
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Backend ko message bhejo
    socketRef.current.emit("ai-message", {
      prompt: message,
    });

    setMessage("");
  };

   // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">
      <header className="h-16 border-b border-gray-800 flex items-center px-6 ">
        <h1 className="text-xl font-semibold">🤖 ChattyBot</h1>
      </header>
      <main className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                🤖
              </div>
              <p className="font-medium mb-1">ChattyBot</p>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3">
                Hello! 👋 How can I help you today?
              </div>
            </div>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user"
                  ? "flex justify-end mb-6"
                  : "flex justify-start mb-6 w-full"
              }
            >
              <div
                className={
                  msg.role === "user"
                    ? "max-w-xl bg-blue-600 rounded-2xl px-4 py-3"
                    : "max-w-3xl bg-gray-900 border-gray-800 rounded-2xl px-4 py-3"
                }
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-6">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">ChattyBot is thinking</span>

                  <span className="animate-pulse">...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <div className="w-full max-w-5xl mx-auto flex gap-3">
            <input
              type="text"
              value={message}
              disabled={isTyping}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message ChattyBot...."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className={`px-5 rounded-xl ${isTyping ? "bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isTyping ? "Thinking..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
