import React, { useEffect, useState } from "react";
import {
  fetchCustomers,
  addCustomer,
  deleteCustomer,
  uploadCSVCustomer,
} from "../../features/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function HalamanCustomer() {
  const dispatch = useDispatch();
  const { items, loading, status, error } = useSelector((s) => s.customer);

  const [nomer, setNomer] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]); // ✅ untuk menyimpan id yang dicentang

  // === Ambil data saat pertama kali ===
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // === Auto reload data setiap kali operasi sukses ===
  useEffect(() => {
    if (status === "succeeded") {
      dispatch(fetchCustomers());
    }
  }, [status, dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nomer.trim()) return alert("Nomor wajib diisi");
    await dispatch(addCustomer({ nomer }));
    setNomer("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus customer ini?")) {
      await dispatch(deleteCustomer(id));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) return alert("Pilih file CSV dulu!");
    const formData = new FormData();
    formData.append("file", csvFile);
    await dispatch(uploadCSVCustomer(formData));
    setCsvFile(null);
  };

  // ✅ Checkbox: tambah/hapus dari selectedIds
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ✅ Checkbox: select all
  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((c) => c.id));
    }
  };

  // ✅ Hapus banyak sekaligus
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0)
      return alert("Pilih minimal satu customer untuk dihapus");
    if (
      window.confirm(`Yakin hapus ${selectedIds.length} customer terpilih?`)
    ) {
      for (const id of selectedIds) {
        await dispatch(deleteCustomer(id));
      }
      setSelectedIds([]);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📇 Daftar Customer</h1>

      {/* ADD Customer */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Masukkan nomor customer..."
          value={nomer}
          onChange={(e) => setNomer(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tambah
        </button>
      </form>

      {/* Upload CSV */}
      <form
        onSubmit={handleUpload}
        className="flex items-center gap-2 mb-6 border p-3 rounded-lg"
      >
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
          className="flex-1"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Upload CSV
        </button>
      </form>

      {/* Tombol hapus banyak */}
      {selectedIds.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Hapus yang dipilih ({selectedIds.length})
          </button>
        </div>
      )}

      {/* Status / Error */}

      {status === "failed" && (
        <p className="text-red-500 text-sm">Error: {error}</p>
      )}
      {status === "succeeded" && (
        <p className="text-green-600 text-sm mb-2">Berhasil diproses!</p>
      )}

      {/* List Customer */}
      <div className="bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === items.length && items.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Nomor Customer</th>
              <th className="p-3 border-b text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  Belum ada data
                </td>
              </tr>
            ) : (
              items.map((c, i) => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                    />
                  </td>
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{c.nomer}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
