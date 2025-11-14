import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../features/chatBotHistory";

export default function AdminChats() {
  const dispatch = useDispatch();
  const { chats, loading, error } = useSelector((state) => state.chats);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // --- ✅ Grouping chats by session_id ---
  const groupedChats =
    chats?.reduce((acc, chat) => {
      if (!acc[chat.session_id]) {
        acc[chat.session_id] = {
          session_id: chat.session_id,
          user_name: chat.user_name,
          items: [],
        };
      }
      acc[chat.session_id].items.push(chat);
      return acc;
    }, {}) || {};
  // Format tanggal lengkap + pagi/siang/malam
  function formatDateTime(datetime) {
    if (!datetime) return "-";

    const dateObj = new Date(datetime.replace(" ", "T")); // biar aman

    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const dayName = days[dateObj.getDay()];
    const date = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    // Tentukan keterangan waktu
    let period = "";
    const h = dateObj.getHours();
    if (h < 12) period = "Pagi";
    else if (h < 15) period = "Siang";
    else if (h < 18) period = "Sore";
    else period = "Malam";

    return `${dayName}, ${date} ${month} ${year} • ${hours}:${minutes} • ${period}`;
  }

  const groupedList = Object.values(groupedChats);

  const totalPages =
    groupedList.length > 0 ? Math.ceil(groupedList.length / limit) : 1;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentChats = groupedList.slice(startIndex, endIndex);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📩 Chat Histories</h1>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border border-gray-300">
          <thead>
            <tr className="bg-biru text-white">
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

                  {/* Ambil created_at dari chat pertama */}
                  <td className="p-2 border text-hitam">
                    {formatDateTime(chat.items?.[0]?.created_at)}
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
        <div className="fixed inset-0 flex items-center text-hitam justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg text-hitam font-bold mb-4">
              Chat Session: {selectedChat.session_id}
            </h2>

            <p className="mb-2 font-medium">
              User: {selectedChat.user_name || "-"}
            </p>

            <div className="space-y-3">
              {selectedChat.items?.map((h) => (
                <div key={h.id} className="border p-3 rounded bg-gray-50">
                  <p className="text-hitam">
                    <span className="font-semibold">User:</span> {h.message}
                  </p>

                  {h.response && (
                    <p className="text-hitam">
                      <span className="font-semibold">Bot:</span> {h.response}
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
