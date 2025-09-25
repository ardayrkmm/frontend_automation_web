import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatWa } from "../../features/historyChatSlice";

export default function AdminChats() {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);

  // State pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // State modal
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    dispatch(chatWa());
  }, [dispatch]);

  // Hitung total halaman
  const totalPages = chats.length > 0 ? Math.ceil(chats.length / limit) : 1;

  // Tentukan data yang tampil sesuai halaman
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentChats = chats.slice(startIndex, endIndex);

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
              <th className="p-2 border">Nomer Telepon</th>
              <th className="p-2 border">Pesan</th>
              <th className="p-2 border">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentChats) && currentChats.length > 0 ? (
              currentChats.map((chat, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{chat.customer?.nama || "-"}</td>
                  <td className="p-2 border">{chat.session_id}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => setSelectedChat(chat)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Lihat
                    </button>
                  </td>
                  <td className="p-2 border">
                    {chat.history?.[0]?.created_at || "-"}
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
        <div className="fixed text-hitam inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              Nomer Telepon: {selectedChat.session_id}
            </h2>
            <p className="mb-2 font-medium">
              Pengguna: {selectedChat.customer?.nama} (
              {selectedChat.customer?.phone})
            </p>
            <div className="space-y-3">
              {selectedChat.history.map((h) => {
                // kalau backend kasih object message
                const content =
                  typeof h.message === "object" ? h.message.content : h.message;

                const type =
                  typeof h.message === "object" ? h.message.type : "human";

                return (
                  <div
                    key={h.id}
                    className={`p-3 rounded ${
                      type === "human"
                        ? "bg-biru text-left"
                        : "bg-biru text-right"
                    }`}
                  >
                    <p>
                      <span className="font-semibold">
                        {type === "human" ? "Pengguna :" : "Genius Bot:"}
                      </span>{" "}
                      {content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{h.created_at}</p>
                  </div>
                );
              })}
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
