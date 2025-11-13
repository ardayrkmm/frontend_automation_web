import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ambilPrice } from "../../features/pricingSlice";
import { fetchOrders } from "../../features/OrderSlice";

export default function PaketTagihan() {
  const dispatch = useDispatch();

  const { data: tagihan, loading: loadingTagihan } = useSelector(
    (s) => s.orders
  );

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(ambilPrice());
    dispatch(fetchOrders());
  }, [dispatch]);

  // Hitung data halaman
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = tagihan.slice(indexFirst, indexLast);
  const totalPages = Math.ceil(tagihan.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold tracking-tight mb-6 text-gray-800">
        💼 Paket & Tagihan
      </h1>

      <div>
        <h2 className="font-semibold mb-4 text-lg">Riwayat Tagihan</h2>

        {loadingTagihan ? (
          <p className="text-gray-500 animate-pulse">Memuat tagihan...</p>
        ) : tagihan.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-xl text-gray-500 bg-gray-50">
            Belum ada data tagihan.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto border border-gray-200 shadow rounded-2xl bg-white">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-700 uppercase text-xs font-semibold tracking-wide">
                  <tr>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Paket</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((t, i) => (
                    <tr
                      key={t.order_id || i}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3">
                        {new Date(t.created_at).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-700">
                        {t.plan_name}
                      </td>
                      <td
                        className={`px-6 py-3 font-semibold ${
                          t.status === "Lunas" || t.status === "paid"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            t.status === "Lunas" || t.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 text-sm">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  Prev
                </button>

                <div className="text-gray-600">
                  Halaman{" "}
                  <span className="font-semibold text-gray-800">
                    {currentPage}
                  </span>{" "}
                  dari{" "}
                  <span className="font-semibold text-gray-800">
                    {totalPages}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
