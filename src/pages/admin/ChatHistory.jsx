// src/pages/AdminChats.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../features/chatBotHistory";

export default function AdminChats() {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const totalPages = chats?.length > 0 ? Math.ceil(chats.length / limit) : 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentChats = chats?.slice(startIndex, endIndex) || [];

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📩 Chat Histories</h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border border-gray-300">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2 border">Nama User</th>
              <th className="p-2 border">Session ID</th>
              <th className="p-2 border">Pesan</th>
              <th className="p-2 border">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {currentChats.length > 0 ? (
              currentChats.map((chat, idx) => (
                <tr key={idx}>
                  <td className="p-2 border text-hitam">
                    {chat.user_name || "-"}
                  </td>
                  <td className="p-2 border text-hitam">{chat.session_id}</td>
                  <td className="p-2 border text-center text-hitam">
                    <button
                      onClick={() => setSelectedChat(chat)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Lihat
                    </button>
                  </td>
                  <td className="p-2 border">
                    {chat.chats?.[0]?.created_at || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  Tidak ada data chat
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          ⬅ Prev
        </button>

        <span>
          Halaman {page} dari {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next ➡
        </button>
      </div>

      {/* Modal */}
      {selectedChat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg text-hitam font-bold mb-4">
              Chat Session: {selectedChat.session_id}
            </h2>
            <p className="mb-2 font-medium">
              User: {selectedChat.user_name || "-"}
            </p>

            <div className="space-y-3">
              {selectedChat.chats?.map((h) => (
                <div key={h.id} className="border p-3 rounded bg-gray-50">
                  <p className="text-hitam">
                    <span className="font-semibold text-hitam">User:</span>{" "}
                    {h.message}
                  </p>
                  {h.response && (
                    <p className="text-hitam">
                      <span className="font-semibold text-hitam">Bot:</span>{" "}
                      {h.response}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{h.created_at}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedChat(null)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
