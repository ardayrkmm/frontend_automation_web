import React from "react";

export function ModalCustomer({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow p-6 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  );
}
