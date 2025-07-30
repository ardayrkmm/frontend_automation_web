import React from "react";
import Button from "../common/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <span className="text-sm text-black">IT Total Solution</span>
      </div>

      {/* Menu */}
      <ul className="flex space-x-6 text-[#4F9CF9] font-medium">
        <li className="cursor-pointer hover:text-blue-800 flex items-center space-x-1">
          <span>Fitur</span>
          <span className="text-xs">▼</span>
        </li>
        <li className="cursor-pointer hover:text-blue-800 flex items-center space-x-1">
          <span>Harga Paket</span>
          <span className="text-xs">▼</span>
        </li>
        <li className="cursor-pointer hover:text-blue-800 flex items-center space-x-1">
          <span>FAQ</span>
          <span className="text-xs">▼</span>
        </li>
        <li className="cursor-pointer hover:text-blue-800 flex items-center space-x-1">
          <span>Bisnis</span>
          <span className="text-xs">▼</span>
        </li>
      </ul>

      {/* Tombol */}
      <div className="flex space-x-3">
        <Button
          variant="secondary"
          size="kecil"
          className="rounded-[8px] font-serif"
        >
          Login
        </Button>
        <Button
          variant="primary"
          className="text-white rounded-[8px] font-serif"
        >
          Coba Chatbot Gratis
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
