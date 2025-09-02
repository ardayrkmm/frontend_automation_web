import Chatbot from "../../components/dashboard/chatbot";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Users, MessageSquare } from "lucide-react";

// Dummy data
const weeklySessions = [
  { label: "W1", sessions: 120 },
  { label: "W2", sessions: 180 },
  { label: "W3", sessions: 150 },
  { label: "W4", sessions: 210 },
  { label: "W5", sessions: 260 },
  { label: "W6", sessions: 230 },
  { label: "W7", sessions: 290 },
  { label: "W8", sessions: 310 },
];

const monthlyNewUsers = [
  { month: "Jan", newUsers: 42 },
  { month: "Feb", newUsers: 55 },
  { month: "Mar", newUsers: 61 },
  { month: "Apr", newUsers: 48 },
  { month: "May", newUsers: 70 },
  { month: "Jun", newUsers: 65 },
  { month: "Jul", newUsers: 72 },
  { month: "Aug", newUsers: 80 },
  { month: "Sep", newUsers: 60 },
  { month: "Oct", newUsers: 68 },
  { month: "Nov", newUsers: 74 },
  { month: "Dec", newUsers: 90 },
];

const totalUsers = monthlyNewUsers.reduce((acc, m) => acc + m.newUsers, 1000); // start with a base to simulate existing users
const DashboardAdmin = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Total Pengguna
            </h3>
            <div className="rounded-xl bg-gray-50 p-2">
              <Users className="h-5 w-5 text-gray-700" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-semibold">
            {totalUsers.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Akumulasi hingga bulan ini
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Sesi Chat (Minggu Ini)
            </h3>
            <div className="rounded-xl bg-gray-50 p-2">
              <MessageSquare className="h-5 w-5 text-gray-700" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-semibold">
            {weeklySessions[weeklySessions.length - 1].sessions}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Perbandingan dengan minggu sebelumnya tersedia di grafik
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              User Baru (Bulan Ini)
            </h3>
            <div className="rounded-xl bg-gray-50 p-2">
              <Users className="h-5 w-5 text-gray-700" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-semibold">
            {monthlyNewUsers[new Date().getMonth()].newUsers}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Total pendaftar baru di bulan berjalan
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
        {/* Line Chart: Weekly Sessions */}
        <div className="xl:col-span-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">
              Jumlah Sesi Chat per Minggu
            </h3>
            <span className="text-xs text-gray-500">8 minggu terakhir</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklySessions}
                margin={{ top: 5, right: 16, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  strokeWidth={2}
                  dot={false}
                  name="Sesi"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: New Users per Month */}
        <div className="xl:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">User Baru per Bulan</h3>
            <span className="text-xs text-gray-500">Tahun berjalan</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyNewUsers}
                margin={{ top: 5, right: 16, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newUsers" name="User Baru" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Placeholder (optional, for future) */}
      <div className="mt-6 rounded-2xl border border-dashed border-gray-200 p-6 text-sm text-gray-500">
        Area ini bisa dipakai untuk ringkasan *chat history* atau quick links
        (export, filter tanggal, dsb).
      </div>
    </div>
  );
};

export default DashboardAdmin;
