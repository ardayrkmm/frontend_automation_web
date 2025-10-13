import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/AdminUserSlice";

export default function UserList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-6 bg-putih">
      <h1 className="text-2xl font-semibold mb-4 text-hitam">
        Daftar Pengguna
      </h1>

      {loading && <p className="text-gray-500">Memuat data...</p>}
      {error && <p className="text-red-500">Gagal memuat data: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-biru">
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Nama</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-hitam">{u.id}</td>
                  <td className="py-2 px-4 border-b  text-hitam">{u.name}</td>
                  <td className="py-2 px-4 border-b  text-hitam">{u.email}</td>
                  <td className="py-2 px-4 border-b  text-hitam">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        u.is_verified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.is_verified ? "Terverifikasi" : "Belum"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
