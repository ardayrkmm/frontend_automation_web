import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ambilPrice } from "../../features/pricingSlice";
import { fetchOrders } from "../../features/OrderSlice";

export default function PaketTagihan() {
  const dispatch = useDispatch();

  const { data: tagihan, loading: loadingTagihan } = useSelector(
    (s) => s.orders
  );

  useEffect(() => {
    dispatch(ambilPrice());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Paket & Tagihan</h1>

      <div>
        <h2 className="font-semibold mb-3 mt-6">Riwayat Tagihan</h2>
        {loadingTagihan ? (
          <p>Memuat tagihan...</p>
        ) : (
          <div className="overflow-x-auto border rounded-2xl">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2">Paket</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.map((t) => (
                  <tr key={t.order_id} className="border-t">
                    <td className="px-4 py-2">
                      {new Date(t.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2">{t.plan_name}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
