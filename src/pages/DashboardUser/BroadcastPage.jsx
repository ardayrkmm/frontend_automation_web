import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendBroadcast } from "../../features/BroadcastSlice";
import { fetchCustomers } from "../../features/CustomerSlice";
import Buttons from "../../components/common/button";

const BroadcastPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Token di localStorage:", localStorage.getItem("token"));
  }, []);

  const {
    loading: broadcastLoading,
    lastResult,
    error: broadcastError,
  } = useSelector((s) => s.broadcast);

  const { items: customers, loading: customerLoading } = useSelector(
    (s) => s.customer
  );

  const [message, setMessage] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Load customer list
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Pesan tidak boleh kosong");

    const selectedNumbers = customers
      .filter((c) => selectedIds.includes(c.id))
      .map((c) => c.nomer);

    if (selectedNumbers.length === 0)
      return alert("Pilih minimal 1 nomor customer");

    dispatch(
      sendBroadcast({ message: message.trim(), numbers: selectedNumbers })
    );
  };

  // ✅ HITUNG PAGINATION
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentCustomers = customers.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // ✅ Pilih semua toggle
  const toggleSelectAll = () => {
    if (selectedIds.length === customers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(customers.map((c) => c.id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-hitam">
      <h2 className="text-2xl font-semibold mb-4">Broadcast Message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pesan Broadcast */}
        <div>
          <label className="block text-sm font-medium mb-1">Pesan</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full text-hitam rounded-lg border-gray-300 p-3 shadow-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Daftar Customer + Pagination */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
          <div className="flex items-center text-hitam justify-between mb-2">
            <strong>Daftar Customer</strong>
            <div className="flex items-center gap-3">
              {/* ✅ Tombol Pilih Semua */}
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-sm text-indigo-600 hover:underline"
              >
                {selectedIds.length === customers.length && customers.length > 0
                  ? "Batalkan Pilihan"
                  : "Pilih Semua"}
              </button>

              <button
                type="button"
                onClick={() => dispatch(fetchCustomers())}
                className="text-sm text-indigo-600 hover:underline"
              >
                Refresh
              </button>
            </div>
          </div>

          {customerLoading ? (
            <p>Loading...</p>
          ) : customers.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada customer.</p>
          ) : (
            <>
              <ul className="space-y-2">
                {currentCustomers.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center text-hitam justify-between bg-biru p-2 rounded border shadow-md hover:shadow-xl transition"
                  >
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(c.id)}
                        onChange={(e) =>
                          setSelectedIds((prev) =>
                            e.target.checked
                              ? [...prev, c.id]
                              : prev.filter((id) => id !== c.id)
                          )
                        }
                      />
                      {c.nomer}
                    </label>
                  </li>
                ))}
              </ul>

              {/* ✅ Pagination UI */}
              <div className="flex justify-between items-center mt-4">
                <Buttons
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Prev
                </Buttons>

                <div className="text-sm">
                  Halaman {currentPage} / {totalPages}
                </div>

                <Buttons
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                  Next
                </Buttons>
              </div>
            </>
          )}
        </div>

        {/* Tombol Broadcast */}
        <div className="flex gap-3">
          <Buttons type="submit" disabled={broadcastLoading}>
            {broadcastLoading ? "Mengirim..." : "Kirim Broadcast"}
          </Buttons>
          <Buttons
            variant="secondary"
            onClick={() => {
              setMessage("");
              setSelectedIds([]);
            }}
            className="px-4 py-2 rounded border"
          >
            Reset
          </Buttons>
        </div>

        {/* Result */}
        {lastResult && (
          <div className="mt-3 p-3 rounded border bg-green-50 text-hitam">
            <pre className="text-sm mt-2">Berhasil Terkirim!</pre>
          </div>
        )}
        {broadcastError && (
          <div className="mt-3 p-3 rounded border bg-red-50 text-red-700">
            Error: {String(broadcastError)}
          </div>
        )}
      </form>
    </div>
  );
};

export default BroadcastPage;
