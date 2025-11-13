import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ambilDataBroadcast } from "../../features/BroadcastSlice";
import { FiClock, FiSend, FiAlertCircle } from "react-icons/fi";

export default function BroadcastHistory() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.broadcast);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // tampilkan 6 data per halaman

  useEffect(() => {
    dispatch(ambilDataBroadcast());
  }, [dispatch]);

  // ✅ Hitung data per halaman
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = items.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        History Broadcast
      </h1>

      {loading && (
        <div className="text-gray-500 animate-pulse">Memuat data...</div>
      )}
      {error && (
        <div className="text-red-500 flex items-center gap-2">
          <FiAlertCircle /> {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-gray-500 italic">Belum ada broadcast.</div>
      )}

      <div className="mt-4 grid gap-3">
        {currentItems.map((b) => (
          <div
            key={b.id}
            className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="text-sm text-gray-600">Nomor Tujuan</div>
              <div className="font-semibold text-gray-800">{b.nomor}</div>

              <div className="text-sm text-gray-600 mt-1">Pesan</div>
              <div className="text-gray-700 text-sm">{b.message}</div>
            </div>

            <div className="mt-3 sm:mt-0 text-sm text-gray-600 flex flex-col sm:items-end">
              <div className="flex items-center gap-1">
                <FiClock className="text-gray-400" />
                <span>
                  {new Date(b.created_at).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>

              {b.sent_at && (
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <FiSend />
                  <span>
                    {new Date(b.sent_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              )}

              <div
                className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  b.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "sent"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          <div className="text-gray-600 text-sm">
            Halaman <span className="font-semibold">{currentPage}</span> dari{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
