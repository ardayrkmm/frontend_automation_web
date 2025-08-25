import React, { useState } from "react";
import Button from "../common/button";
import arrow_r from "../../assets/arrow_b.png";
import Logo from "../../assets/Logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowRoundForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa"; // 🔹 ikon profil
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const handleLoginClick = () => navigate("/auth/login");

  // 🔹 Ambil status login dari Redux
  const { token } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md px-[24px] py-[16px]">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-[62px] w-[146px]" />
        </div>

        {/* Toggle mobile */}
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-[#4F9CF9] text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Menu desktop */}
        <div className="hidden lg:flex">
          <ul className="flex space-x-6 text-hitam font-medium">
            {["Bisnis", "Fitur", "Harga Paket", "FAQ"].map((menu, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-800 flex items-center space-x-1"
              >
                <span className="mr-[10px]">{menu}</span>
                <IoIosArrowDown />
              </li>
            ))}
          </ul>
        </div>

        {/* Tombol kanan */}
        <div className="hidden lg:flex space-x-3">
          {token ? (
            // 🔹 Jika sudah login → tampilkan ikon profil
            <button
              onClick={() => navigate("/profile")}
              className="text-[#4F9CF9] text-3xl"
            >
              <FaUserCircle />
            </button>
          ) : (
            // 🔹 Jika belum login → tampilkan tombol login
            <>
              <Button
                variant="secondary"
                size="kecil"
                onClick={handleLoginClick}
                className="rounded-[8px] font-serif"
              >
                Login
              </Button>
              <Button
                variant="primary"
                className="text-white rounded-[8px] font-serif"
              >
                Coba Chatbot Gratis <IoIosArrowRoundForward />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
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
            {token ? (
              // 🔹 Mobile profil button
              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center justify-center py-2 rounded-[8px] border text-[#4F9CF9] font-serif"
              >
                <FaUserCircle className="text-2xl mr-2" /> Profil
              </button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="kecil"
                  className="w-full rounded-[8px] font-serif"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  className="w-full text-white rounded-[8px] font-serif"
                >
                  Coba Chatbot Gratis
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
