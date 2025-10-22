// src/components/GeniusCard.jsx
import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logos from "../../assets/logos.png";

export default function GeniusCard() {
  const [show, setShow] = useState(true);
  const [question, setQuestion] = useState(""); // ✅ input state
  const navigate = useNavigate();

  if (!show) return null;

  const handleAsk = () => {
    if (!question.trim()) return; // jangan kirim kosong
    // arahkan ke Chatbot + bawa pertanyaan user
    navigate(`/chatbot?question=${encodeURIComponent(question)}`);
  };

  return (
    <div className="flex justify-center items-center h-[600px] bg-putih">
      <div className="relative w-[476px] h-[470px] bg-white shadow-lg rounded-[22px] p-5 text-center">
        {/* Logo box */}
        <div className="relative bg-gray-100 w-[436px] h-[200px] rounded-lg mx-auto mb-4 flex justify-center items-center">
          {/* Tombol close */}
          <button
            onClick={() => setShow(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
          <img src={logos} alt="Genius AI" className="w-[200px]" />
        </div>

        {/* Isi */}
        <h2 className="text-lg font-semibold mb-2">Apasih Itu Genius AI?</h2>
        <p className="text-sm text-gray-500 mb-3">
          Tanyakan apapun tentang Genius AI di bawah ini 👇
        </p>

        {/* ✅ Input pertanyaan */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="contoh: Apa fungsi Genius AI?"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5F65F6]"
        />

        {/* Tombol kirim */}
        <button
          onClick={handleAsk}
          className="bg-[#5F65F6] w-full h-[61px] text-white px-5 py-2 rounded-xl hover:bg-indigo-600 transition font-medium"
        >
          Tanya Sekarang!
        </button>
      </div>
    </div>
  );
}
