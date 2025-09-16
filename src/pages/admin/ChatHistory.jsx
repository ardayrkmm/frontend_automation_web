// src/pages/AdminChats.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../features/historyChatSlice";

export default function AdminChats() {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);

  // State pagination
  const [page, setPage] = useState(1);
  const limit = 10; // jumlah data per halaman

  useEffect(() => {
    dispatch(fetchChats());
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
              <th className="p-2 border">Session ID</th>
              <th className="p-2 border">Pesan</th>
              <th className="p-2 border">Jawaban</th>
              <th className="p-2 border">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentChats) && currentChats.length > 0 ? (
              currentChats.map((chat) => (
                <tr key={chat.id} className="">
                  <td className="p-2 border">{chat.user_name}</td>
                  <td className="p-2 border">{chat.session_id}</td>
                  <td className="p-2 border">{chat.message}</td>
                  <td className="p-2 border">{chat.response}</td>
                  <td className="p-2 border">{chat.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-500">
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
    </div>
  );
}
