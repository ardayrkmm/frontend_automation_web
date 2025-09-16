import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatsPerDay,
  fetchChatsPerHour,
  fetchGuestVsRegistered,
} from "../../features/adminDashSlice";

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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardAdmin = () => {
  const dispatch = useDispatch();
  const { perDay, perHour, guestVsRegistered, loading, error } = useSelector(
    (state) => state.chatStats
  );

  useEffect(() => {
    dispatch(fetchChatsPerDay());
    dispatch(fetchChatsPerHour());
    dispatch(fetchGuestVsRegistered());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">📊 Dashboard Admin</h1>

      {/* Line Chart: Chat per Day */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <h3 className="mb-2 text-hitam font-semibold">Jumlah Chat per Hari</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={perDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tanggal" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_chat"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Chat per Hour */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <h3 className="mb-2 font-semibold text-hitam">
          Distribusi Chat per Jam
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={perHour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="jam" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_chat" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        {/* Teks tambahan bawah chart */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Tanggal: {new Date().toLocaleDateString()}</span>
          <span>
            Total Chat: {perHour.reduce((acc, cur) => acc + cur.total_chat, 0)}
          </span>
        </div>
      </div>

      {/* Pie Chart: Guest vs Registered */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow">
        <h3 className="mb-2 font-semibold text-hitam">Data antara user</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={guestVsRegistered}
              dataKey="total_chat"
              nameKey="kategori"
              outerRadius={120}
              label
            >
              <Cell fill="#0088FE" />
              <Cell fill="#FF8042" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAdmin;
