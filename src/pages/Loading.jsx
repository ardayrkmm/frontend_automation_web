import React from "react";
import logos from "../assets/logos.png";

export default function AppLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <img
          src={logos}
          className="w-[300px] sm:w-[400px] md:w-[500px]"
          alt="Logo"
        />

        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 border-4 border-blue-500 border-t-transparent"></div>

        {/* Text */}
        <h1 className="mt-6 text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold text-biru">
          Tunggu sebentar ya....
        </h1>
      </div>
    </div>
  );
}
