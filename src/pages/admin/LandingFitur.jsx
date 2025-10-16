import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeature } from "../../features/LandingFiturSlice";

export default function AdminAddFeature() {
  const dispatch = useDispatch();
  const { addStatus, addError } = useSelector(
    (state) => state.landingFitur || {}
  );

  const [form, setForm] = useState({
    title: "",
    desc: "",
    gambar: null, // simpan file, bukan URL
    order_index: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]: name === "order_index" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((p) => ({
      ...p,
      gambar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.desc || !form.gambar) {
      alert("Judul, deskripsi, dan gambar wajib diisi.");
      return;
    }

    dispatch(addFeature(form))
      .unwrap()
      .then(() => {
        setForm({ title: "", desc: "", gambar: null, order_index: 0 });
        alert("Fitur berhasil ditambahkan!");
      })
      .catch((err) => {
        console.error("Add feature error:", err);
        alert("Gagal menambahkan fitur: " + (err.msg || err));
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow text-hitam">
      <h2 className="text-2xl font-semibold mb-4">Tambah Fitur</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Contoh: Omnichannel Platforms"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            placeholder="Deskripsi fitur..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Gambar
          </label>
          <input
            type="file"
            name="gambar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border px-3 py-2 rounded"
          />
          {form.gambar && (
            <p className="text-xs text-gray-500 mt-1">
              File dipilih: {form.gambar.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order Index</label>
          <input
            name="order_index"
            type="number"
            value={form.order_index}
            onChange={handleChange}
            className="w-32 border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={addStatus === "pending"}
          >
            {addStatus === "pending" ? "Menyimpan..." : "Tambah Fitur"}
          </button>

          {addStatus === "succeeded" && (
            <span className="text-green-600">✅ Berhasil</span>
          )}
          {addStatus === "failed" && (
            <span className="text-red-600">
              ❌ Gagal: {addError?.msg || addError}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
