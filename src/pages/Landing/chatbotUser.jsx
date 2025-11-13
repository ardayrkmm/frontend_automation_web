import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Config from "../../api/config";

export default function ChatbotGuest() {
  const { chatbot_id } = useParams(); // ambil chatbot_id dari URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("guest_session") || ""
  );

  // Saat pertama kali load, buat session baru kalau belum ada
  useEffect(() => {
    if (!sessionId) {
      const newSession = crypto.randomUUID();
      setSessionId(newSession);
      localStorage.setItem("guest_session", newSession);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "guest", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}/user/chatbot/guest/${chatbot_id}`,
        {
          message: input,
          session_id: sessionId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": Config.API_KEY,
          },
        }
      );

      const botReply = res.data.response;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: gagal menghubungi chatbot." },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">
            Mulai chat dengan chatbot ini ✨
          </p>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "guest" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                msg.sender === "guest"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ketik pesan..."
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
