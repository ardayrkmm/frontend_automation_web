import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Auto greeting saat pertama kali load
  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Halo!";
    if (hour < 12) {
      greeting = "Halo, selamat pagi 👋!";
    } else if (hour < 18) {
      greeting = "Halo, selamat siang 👋!";
    } else {
      greeting = "Halo, selamat malam 👋!";
    }

    setMessages([
      { sender: "ai", text: `${greeting} Boleh tahu siapa nama kamu?` },
    ]);
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Tambah pesan user ke UI
    setMessages([...messages, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const response = await fetch(
        "https://n8n.gitstraining.com/webhook/chatbot44",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chatInput: userMessage }),
        }
      );

      const data = await response.json();

      // Tampilkan balasan AI dari n8n
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.reply ||
            data.answer ||
            data.text ||
            data.message || // ambil "message" dari JSON
            "AI tidak merespon",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Error koneksi ke server" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold">Genius AI</h1>
        <p className="text-gray-500">
          Chat with the smartest AI - Experience the power of AI with us
        </p>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 mt-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type '/' for commands"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-hitam border rounded-xl px-4 py-2 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-hitam p-3 rounded-xl hover:bg-blue-600 transition"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
