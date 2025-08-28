import React from "react";
import logo from "../assets/logos.png";
import bot from "../assets/logos1.png";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Logo pojok kiri atas */}
      <img src={logo} alt="Logo" className="absolute top-6 left-6 w-16 z-20" />

      {/* Gambar bot sebagai background */}
      <img
        src={bot}
        alt="Bot"
        className="absolute bottom-0 right-[600px] w-[400px] z-0"
      />

      {/* Isi halaman */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Layout;
