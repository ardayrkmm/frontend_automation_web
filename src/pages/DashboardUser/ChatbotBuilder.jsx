import { useState } from "react";
import { FiPlus, FiGlobe, FiMessageCircle, FiUpload } from "react-icons/fi";

export default function ChatbotBuilder() {
  const [bots, setBots] = useState([
    {
      id: 1,
      nama: "Website Chatbot",
      platform: "Website",
      dokumen: "Panduan Produk.pdf",
      tanggal: "2025-10-01",
    },
    {
      id: 2,
      nama: "WhatsApp Assistant",
      platform: "WhatsApp",
      dokumen: "FAQ Pelanggan.pdf",
      tanggal: "2025-09-22",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newBot, setNewBot] = useState({ nama: "", platform: "Website" });

  const handleAddBot = () => {
    if (!newBot.nama) return alert("Nama chatbot harus diisi!");
    const newEntry = {
      id: bots.length + 1,
      nama: newBot.nama,
      platform: newBot.platform,
      dokumen: "-",
      tanggal: new Date().toISOString().split("T")[0],
    };
    setBots([...bots, newEntry]);
    setNewBot({ nama: "", platform: "Website" });
    setShowModal(false);
  };

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chatbot Builder</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <FiPlus /> Tambah Chatbot
        </button>
      </div>

      {/* Daftar Bot */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{bot.nama}</h3>
              {bot.platform === "Website" ? (
                <FiGlobe className="text-blue-500" />
              ) : (
                <FiMessageCircle className="text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-500 mb-1">
              Platform: <span className="font-medium">{bot.platform}</span>
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Dokumen: <span className="font-medium">{bot.dokumen}</span>
            </p>
            <p className="text-xs text-gray-400">Dibuat: {bot.tanggal}</p>

            <div className="mt-4 flex justify-between">
              <button className="flex items-center gap-1 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50">
                <FiUpload /> Upload Dokumen
              </button>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Kelola
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Tambah Chatbot Baru</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Chatbot"
                value={newBot.nama}
                onChange={(e) => setNewBot({ ...newBot, nama: e.target.value })}
                className="w-full border rounded-xl px-3 py-2 focus:outline-blue-500"
              />
              <select
                value={newBot.platform}
                onChange={(e) =>
                  setNewBot({ ...newBot, platform: e.target.value })
                }
                className="w-full border rounded-xl px-3 py-2 focus:outline-blue-500"
              >
                <option value="Website">Website</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleAddBot}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
