import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ambilHistoriPengguna } from "../../features/PaketHistoriPenggunaSlice";

export default function PaketHistoriPengguna() {
  const dispatch = useDispatch();

  const { data: tagihan, loading: loadingTagihan } = useSelector(
    (s) => s.orders
  );

  // --- Pagination state ---
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(ambilHistoriPengguna());
  }, [dispatch]);

  const totalPages =
    tagihan?.length > 0 ? Math.ceil(tagihan.length / limit) : 1;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentRows = tagihan?.slice(startIndex, endIndex) || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-hitam">Paket Histori Pengguna</h1>

      <div>
        <h2 className="font-semibold mb-3 mt-6 text-hitam">Riwayat Tagihan</h2>

        {loadingTagihan ? (
          <p>Memuat tagihan...</p>
        ) : (
          <>
            <div className="overflow-x-auto border rounded-2xl">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-biru text-putih">
                  <tr>
                    <th className="px-4 py-2">Order Id</th>
                    <th className="px-4 py-2">Id User</th>
                    <th className="px-4 py-2">Nama Pengguna</th>
                    <th className="px-4 py-2">Nama Paket</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.length > 0 ? (
                    currentRows.map((t) => (
                      <tr key={t.order_id} className="border-t">
                        <td className="px-4 py-2 text-hitam">{t.order_id}</td>
                        <td className="px-4 py-2 text-hitam">{t.user_id}</td>
                        <td className="px-4 py-2 text-hitam">{t.user_name}</td>
                        <td className="px-4 py-2 text-hitam">{t.plan_name}</td>
                        <td className="px-4 py-2 text-hitam">{t.amount}</td>

                        <td
                          className={`px-4 py-2 font-medium ${
                            t.status === "Lunas" || t.status === "paid"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {t.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        Tidak ada data tagihan
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

              <span className="font-medium text-hitam">
                Halaman {page} dari {totalPages}
              </span>

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
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
          </>
        )}
      </div>
    </div>
  );
}
