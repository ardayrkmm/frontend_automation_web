import {
  FiMessageSquare,
  FiSearch,
  FiSettings,
  FiBox,
  FiPlus,
  FiX,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { useState } from "react";

import logo from "../../assets/logos.png";

import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const [expanded, setExpanded] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [landingOpen, setLandingOpen] = useState(false);

  const location = useLocation();

  return (
    <div
      className={`fixed z-50 md:static top-0 left-0 h-full bg-[#ffffff] transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 ${
        expanded ? "w-[260px]" : "w-[80px]"
      }`}
    >
      <div className="flex flex-col h-full justify-between px-3 py-4">
        {/* Header */}
        <div>
          {/* Mobile close */}
          <div className="text-black">
            <div className="flex items-center justify-between mb-6 md:hidden">
              <div className="flex flex-row items-center gap-2">
                <img src={logo} alt="Logo" className="h-[50px]" />
                <h1 className="text-[#5D5FEF] text-[20px] font-semibold">
                  Genius AI
                </h1>
              </div>
              <button onClick={toggleSidebar} className="text-black">
                <FiX size={24} />
              </button>
            </div>
          </div>

          {/* Logo desktop */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="h-7 cursor-pointer"
                onClick={() => !expanded && setExpanded(true)}
              />
              {expanded && (
                <h1 className="text-[#5D5FEF] text-[18px] font-semibold">
                  Genius AI
                </h1>
              )}
            </div>
            {expanded ? (
              <button
                onClick={() => setExpanded(false)}
                className="text-gray-500"
              >
                <FiChevronsLeft size={20} />
              </button>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                className="text-gray-500"
              >
                <FiChevronsRight size={20} />
              </button>
            )}
          </div>

          {/* Menu */}
          <div className="space-y-2">
            <SidebarButton
              icon={<FiMessageSquare />}
              label="Dashboard"
              path="/admin"
              expanded={expanded}
              active={location.pathname === "/admin"}
            />
            <SidebarButton
              icon={<FiMessageSquare />}
              label="Pengguna"
              path="/admin/dashboard/pengguna"
              expanded={expanded}
              active={location.pathname === "/admin/dashboard/pengguna"}
            />

            <SidebarButton
              icon={<FiBox />}
              label="Histori Paket Pengguna"
              path="/admin/history/paket/pengguna"
              expanded={expanded}
              active={location.pathname === "/admin/history/paket/pengguna"}
            />

            {/* landing Section */}
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className={`flex items-center justify-between px-4 py-3 w-full rounded-lg transition-colors
                ${
                  historyOpen
                    ? "bg-[#F5F5FF] text-[#5D5FEF]"
                    : "text-gray-700 hover:bg-[#F5F5FF] hover:text-[#5D5FEF]"
                }`}
            >
              <div className="flex items-center gap-3">
                <FiBox />
                {expanded && (
                  <span className="font-bold">History Chat User</span>
                )}
              </div>
              {expanded && (historyOpen ? <FiChevronUp /> : <FiChevronDown />)}
            </button>

            {historyOpen && expanded && (
              <div className="ml-8 space-y-1">
                <SidebarButton
                  label="Website"
                  path="/admin/history/website"
                  expanded={expanded}
                  active={location.pathname === "/admin/history/website"}
                />
                {/* <SidebarButton
                  label="WhatsApp"
                  path="/admin/history/wa"
                  expanded={expanded}
                  active={location.pathname === "/admin/history/wa"}
                /> */}
              </div>
            )}

            {/* <button
              onClick={() => setLandingOpen(!landingOpen)}
              className={`flex items-center justify-between px-4 py-3 w-full rounded-lg transition-colors
                ${
                  landingOpen
                    ? "bg-[#F5F5FF] text-[#5D5FEF]"
                    : "text-gray-700 hover:bg-[#F5F5FF] hover:text-[#5D5FEF]"
                }`}
            >
              <div className="flex items-center gap-3">
                <FiBox />
                {expanded && <span className="font-bold">Landing</span>}
              </div>
              {expanded && (landingOpen ? <FiChevronUp /> : <FiChevronDown />)}
            </button>

            {landingOpen && expanded && (
              <div className="ml-8 space-y-1">
                <SidebarButton
                  label="Section Fitur"
                  path="/admin/landing/fitur"
                  expanded={expanded}
                  active={location.pathname === "/admin/landing/fitur"}
                />
                <SidebarButton
                  label="WhatsApp"
                  path="/admin/history/wa"
                  expanded={expanded}
                  active={location.pathname === "/admin/history/wa"}
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarButton = ({
  icon,
  label,
  shortcut,
  active,
  expanded = true,
  path,
}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => path && navigate(path)}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium transition-colors
        ${
          active
            ? "bg-[#5D5FEF] text-white shadow"
            : "text-gray-700 hover:bg-[#F5F5FF] hover:text-[#5D5FEF]"
        }`}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {expanded && <span>{label}</span>}
      {expanded && shortcut && (
        <span className="ml-auto text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
          {shortcut}
        </span>
      )}
    </button>
  );
};

export default SidebarAdmin;
