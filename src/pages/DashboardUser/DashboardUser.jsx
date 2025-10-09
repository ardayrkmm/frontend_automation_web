import { FiCpu, FiMessageSquare, FiCreditCard } from "react-icons/fi";

export default function HalDashboardUser() {
  // Dummy data
  const stats = [
    {
      icon: <FiCpu className="text-blue-600 text-2xl" />,
      label: "Total Chatbot",
      value: 3,
      desc: "2 Website, 1 WhatsApp",
    },
    {
      icon: <FiMessageSquare className="text-green-600 text-2xl" />,
      label: "Broadcast Terkirim",
      value: 12,
      desc: "Dalam 7 hari terakhir",
    },
    {
      icon: <FiCreditCard className="text-indigo-600 text-2xl" />,
      label: "Paket Aktif",
      value: "Pro Plan",
      desc: "Berlaku hingga 30 Okt 2025",
    },
  ];

  const recentBots = [
    {
      id: 1,
      nama: "Website Chatbot",
      platform: "Website",
      tanggal: "2025-10-01",
    },
    {
      id: 2,
      nama: "WhatsApp Assistant",
      platform: "WhatsApp",
      tanggal: "2025-09-25",
    },
  ];

  const lastBroadcasts = [
    {
      id: 1,
      pesan: "Promo bulan Oktober sudah dimulai!",
      tanggal: "2025-10-05",
    },
    {
      id: 2,
      pesan: "Cek panduan chatbot terbaru di dashboard.",
      tanggal: "2025-10-02",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Statistik Ringkas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
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

      {/* Daftar Chatbot */}
      <div>
        <h2 className="font-semibold mb-3">Chatbot Terbaru</h2>
        <div className="border rounded-2xl overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Platform</th>
                <th className="px-4 py-2">Tanggal Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {recentBots.map((bot) => (
                <tr key={bot.id} className="border-t">
                  <td className="px-4 py-2">{bot.nama}</td>
                  <td className="px-4 py-2">{bot.platform}</td>
                  <td className="px-4 py-2">{bot.tanggal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {lastBroadcasts.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-4 py-2">{b.tanggal}</td>
                  <td className="px-4 py-2">{b.pesan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
