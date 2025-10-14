import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { uploadChatbot } from "../../features/createChatbot";

export default function ChatbotBuilder() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.chatbot);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newBot, setNewBot] = useState({ nama: "", platform: "Website" });
  const [file, setFile] = useState(null);

  const handleAddBot = () => {
    if (!newBot.nama) return alert("Nama chatbot harus diisi!");
    if (!file) return alert("File harus dipilih!");

    dispatch(uploadChatbot({ name: newBot.nama, file }))
      .unwrap()
      .then(() => {
        setNewBot({ nama: "", platform: "Website" });
        setFile(null);
        setShowModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500); // popup hilang otomatis
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="p-6">
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
        <h1>Menyusul</h1>
      </div>

      {/* Modal Tambah */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-hitam">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg relative">
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-4">Tambah Chatbot Baru</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Chatbot"
                value={newBot.nama}
                onChange={(e) => setNewBot({ ...newBot, nama: e.target.value })}
                className="w-full border rounded-xl px-3 py-2 focus:outline-blue-500"
              />

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border rounded-xl px-3 py-2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="border px-4 py-2 rounded-xl hover:bg-gray-100 disabled:opacity-60"
              >
                Batal
              </button>
              <button
                onClick={handleAddBot}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Mengupload..." : "Tambah"}
              </button>
            </div>

            {error && (
              <div className="mt-3 text-red-600 text-sm">Error: {error}</div>
            )}
          </div>
        </div>
      )}

      {/* Popup sukses */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          ✅ Chatbot berhasil ditambahkan!
        </div>
      )}
    </div>
  );
}
