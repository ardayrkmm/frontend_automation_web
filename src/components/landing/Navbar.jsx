import React, { useState } from "react";
import Button from "../common/button";
import arrow_r from "../../assets/arrow_b.png";
import Logo from "../../assets/logos.png";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowRoundForward } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice"; // ✅ import logout action

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // ✅ state dropdown profil
  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => navigate("/auth/login");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login"); // ✅ setelah logout, balik ke login
  };

  const chatBotClick = () => navigate("/chatbot");

  const menus = [
    { name: "Bisnis", path: "/bisnis" },
    { name: "Fitur", path: "/fitur" },
    { name: "Harga Paket", path: "/harga" },
    { name: "FAQ", path: "/faq" },
    { name: "Chatbot", path: "/chatbot" },
  ];

  const { token } = useSelector((state) => state.auth);

  return (
    <nav className="bg-white shadow-md px-[24px] py-[16px] relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className=" w-[146px]" />
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
            {menus.map((menu, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-800 flex items-center space-x-1"
              >
                <Link to={menu.path} className="mr-[10px]">
                  {menu.name}
                </Link>
                <IoIosArrowDown />
              </li>
            ))}
          </ul>
        </div>

        {/* Tombol kanan */}
        <div className="hidden lg:flex space-x-3 relative">
          {token ? (
            // 🔹 Jika sudah login → ikon profil + dropdown
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-[#4F9CF9] text-3xl"
              >
                <FaUserCircle />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // 🔹 Jika belum login → tampilkan tombol login
            <>
              <Button
                variant="secondary"
                size="kecil"
                onClick={handleLoginClick}
                className="rounded-[8px] w-[126px] h-[60px] font-serif"
              >
                Login
              </Button>
              <Button
                variant="primary"
                onClick={chatBotClick}
                className="text-white w-[239px] h-[60px] rounded-[8px] font-serif"
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
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center justify-center py-2 rounded-[8px] border text-[#4F9CF9] font-serif"
                >
                  <FaUserCircle className="text-2xl mr-2" /> Profil
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center py-2 rounded-[8px] border text-red-500 font-serif"
                >
                  Logout
                </button>
              </>
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
                  onClick={chatBotClick}
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
