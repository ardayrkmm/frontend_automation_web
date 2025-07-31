import React, { useState } from "react";
import Button from "../common/button";
import arrow_r from "../../assets/arrow_b.png";
import Logo from "../../assets/Logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-[24px] py-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-[62px] w-[146px]" />
        </div>

        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-[#4F9CF9] text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className="hidden lg:flex">
          <ul className="flex space-x-6 text-[#4F9CF9] font-medium">
            {["Fitur", "Harga Paket", "FAQ", "Bisnis"].map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-800 mr-[32px] flex items-center space-x-1"
              >
                <span className="mr-[10px]">{item}</span>
                <img src={arrow_r} alt="" className="w-[9px] h-[4px]" />
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:flex space-x-3">
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
      </div>

      {isOpen && (
        <div className="block lg:hidden mt-4 space-y-3">
          {["Fitur", "Harga Paket", "FAQ", "Bisnis"].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center text-[#4F9CF9] space-x-1"
            >
              <span>{item}</span>
              <img src={arrow_r} alt="" className="w-[9px] h-[4px]" />
            </div>
          ))}

          <div className="pt-2 space-y-2">
            <Button
              variant="secondary"
              size="kecil"
              className="w-full rounded-[8px] font-serif"
            >
              Login
            </Button>
            <Button
              variant="primary"
              className="w-full text-white rounded-[8px] font-serif"
            >
              Coba Chatbot Gratis
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
