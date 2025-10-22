import React from "react";

export default function PolicyModal({ title, content, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">{title}</h2>
        <div className="text-gray-700 space-y-3">{content}</div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
