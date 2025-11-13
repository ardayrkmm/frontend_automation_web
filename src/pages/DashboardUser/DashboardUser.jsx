import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiCpu,
  FiMessageSquare,
  FiCreditCard,
  FiAlertCircle,
} from "react-icons/fi";
import Config from "../../api/config";

export default function HalDashboardUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${Config.API_BASE_URL}/user/dashboard/analys`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetch dashboard:", err);
        setError("Gagal memuat data dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-gray-500 animate-pulse">
        Memuat data dashboard...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-500 flex items-center gap-2">
        <FiAlertCircle /> {error}
      </div>
    );

  const { stats, broadcasts, orders } = data;

  const statCards = [
    {
      icon: <FiMessageSquare className="text-green-600 text-2xl" />,
      label: "Broadcast Terkirim",
      value: stats.broadcast_sent,
      desc: `${stats.total_broadcast} total broadcast`,
    },
    {
      icon: <FiCreditCard className="text-indigo-600 text-2xl" />,
      label: "Paket Aktif",
      value: stats.active_plan,
      desc: `Berlaku hingga ${stats.active_until}`,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Statistik Ringkas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="p-3 bg-gray-100 rounded-xl">{s.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{s.label}</p>
              <h3 className="text-xl font-semibold">{s.value}</h3>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcast Terakhir */}
      <div>
        <h2 className="font-semibold mb-3 mt-6">Broadcast Terakhir</h2>
        <div className="border rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Pesan</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {broadcasts.length > 0 ? (
                broadcasts.map((b, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{b.date}</td>
                    <td className="px-4 py-2">{b.message}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === "sent"
                            ? "bg-green-100 text-green-700"
                            : b.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-400 py-4 italic"
                  >
                    Tidak ada broadcast terakhir.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Riwayat Paket */}
      <div>
        <h2 className="font-semibold mb-3 mt-6">Riwayat Paket</h2>
        <div className="border rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Paket</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{o.created_at}</td>
                    <td className="px-4 py-2">{o.plan_name}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        o.status === "paid" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {o.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-400 py-4 italic"
                  >
                    Belum ada riwayat paket.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
