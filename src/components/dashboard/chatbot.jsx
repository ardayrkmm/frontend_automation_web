import { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserMessage,
  sendMessage,
  addBotMessage,
  clearChat,
} from "../../features/chatbotSlice";
import { useLocation } from "react-router-dom";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const { messages, loading } = useSelector((state) => state.chatbot);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const location = useLocation();

  const hasAsked = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuestion = params.get("question");

    if (hasAsked.current) return;

    if (messages.length === 0) {
      const hour = new Date().getHours();
      let greeting = "Halo 👋!";
      if (hour < 12) greeting = "Halo, selamat pagi 👋!";
      else if (hour < 18) greeting = "Halo, selamat siang 👋!";
      else greeting = "Halo, selamat malam 👋!";

      dispatch(clearChat());
      dispatch(addBotMessage(`${greeting} Boleh tahu siapa nama kamu?`));

      if (initialQuestion) {
        hasAsked.current = true; // ✅ tandai sudah kirim
        setTimeout(() => {
          dispatch(addUserMessage(initialQuestion));
          dispatch(
            sendMessage({
              message: initialQuestion,
              isGuest: !token,
            })
          );
        }, 1000);
      }
    }
  }, [dispatch, location.search, messages.length, token]);
  const handleSend = () => {
    if (!input.trim()) return;

    // ✅ kalau guest & sudah 10 message dari user → stop
    if (!token) {
      const userMessages = messages.filter((msg) => msg.sender === "user");
      if (userMessages.length >= 10) {
        dispatch(
          addBotMessage(
            "🚀 Silahkan login untuk melanjutkan obrolan tanpa batas."
          )
        );
        setInput("");
        return;
      }
    }

    dispatch(addUserMessage(input));

    dispatch(
      sendMessage({
        message: input,
        isGuest: !token, // kalau ga ada token = guest
      })
    );

    setInput("");
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
            className={`p-3 rounded-lg max-w-[50%] whitespace-pre-line break-words ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-800 mr-auto"
            }`}
            dangerouslySetInnerHTML={{
              __html: msg.text
                .replace(/\n/g, "<br>") // biar baris baru tetap kelihatan
                .replace(/- /g, "• "), // ubah list jadi bullet
            }}
          />
        ))}

        {loading && (
          <div className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 mr-auto">
            Sedang mengetik...
          </div>
        )}
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
