import { useDispatch, useSelector } from "react-redux";
import Chatbot from "../../components/dashboard/chatbot";
import { useState } from "react";
import { sendBroadcast } from "../../features/BroadcastSlice";

const BroadcastPage = () => {
  const dispatch = useDispatch();
  const { loading, lastResult, error } = useSelector((s) => s.broadcast);

  const [message, setMessage] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [numbers, setNumbers] = useState([]);

  const addNumber = () => {
    let raw = numberInput.trim();
    if (!raw) return;
    raw = raw.replace(/[\s-]/g, "");
    if (numbers.includes(raw)) {
      setNumberInput("");
      return;
    }
    setNumbers((p) => [...p, raw]);
    setNumberInput("");
  };

  const removeNumber = (idx) => {
    setNumbers((p) => p.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Message tidak boleh kosong");
    if (numbers.length === 0) return alert("Tambahkan minimal 1 nomor");
    console.log("DATA DIKIRIM:", { message, numbers });

    dispatch(sendBroadcast({ message: message.trim(), numbers }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Broadcast Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full text-hitam rounded-lg border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Tulis pesan broadcast di sini..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tambah Nomor</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              className="flex-1 text-hitam rounded-lg border-gray-300 p-2"
              placeholder="contoh: +62812xxxx atau 0812xxxx"
            />
            <button
              type="button"
              onClick={addNumber}
              className="px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Tambah
            </button>
          </div>
        </div>

        {numbers.length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg text-hitam">
            <div className="flex items-center justify-between mb-2">
              <strong>Daftar Nomor ({numbers.length})</strong>
              <button
                type="button"
                onClick={() => setNumbers([])}
                className="text-sm text-red-600 hover:underline"
              >
                Hapus semua
              </button>
            </div>
            <ul className="space-y-2">
              {numbers.map((n, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-white p-2 rounded-md border"
                >
                  <div className="text-sm">{n}</div>
                  <button
                    type="button"
                    onClick={() => removeNumber(i)}
                    className="text-xs px-2 py-1 rounded bg-red-100 text-red-700"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Mengirim..." : "Kirim Broadcast"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setNumbers([]);
              setNumberInput("");
            }}
            className="px-4 py-2 rounded border"
          >
            Reset
          </button>
        </div>

        <div>
          {lastResult && (
            <div className="mt-3 p-3 rounded border bg-green-50 text-hitam">
              <pre className="text-sm mt-2">Berhasil Terkirim!</pre>
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 rounded border bg-red-50 text-red-700">
              Error: {String(error)}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default BroadcastPage;
