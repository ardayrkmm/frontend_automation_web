// src/pages/AdminChats.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../features/historyChatSlice";

export default function AdminChats() {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📩 Chat Histories</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border border-gray-300">
          <thead>
            <tr className="bg-black">
              <th className="p-2 border">Nama User</th>
              <th className="p-2 border">Session ID</th>
              <th className="p-2 border">Pesan</th>
              <th className="p-2 border">Jawaban</th>
              <th className="p-2 border">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(chats) && chats.length > 0 ? (
              chats.map((chat) => (
                <tr key={chat.id} className="hover:bg-gray-50">
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
    </div>
  );
}
