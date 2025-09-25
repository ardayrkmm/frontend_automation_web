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
import avatar from "../../assets/avatar_3.png";
import logo from "../../assets/logos.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
const SidebarAdmin = ({ isOpen, toggleSidebar }) => {
  const [expanded, setExpanded] = useState(true); // toggle width
  const [historyOpen, setHistoryOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  console.log("Sidebar user =>", user);

  return (
    <div
      className={`fixed z-50 md:static top-0 left-0 h-full bg-[#141718] transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 ${
        expanded ? "w-[260px]" : "w-[80px]"
      }`}
    >
      <div className="flex flex-col h-full justify-between px-3 py-4 text-sm text-white">
        {/* Header */}
        <div>
          {/* Close button (mobile only) */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <img src={logo} alt="Logo" className="h-7" />
            <button onClick={toggleSidebar}>
              <FiX size={24} />
            </button>
          </div>

          {/* Logo + toggle expand (desktop) */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <img
              src={logo}
              alt="Logo"
              className="h-7 cursor-pointer"
              onClick={() => {
                if (!expanded) setExpanded(true); // hanya aktif saat collapsed
              }}
            />
            {expanded && (
              <button onClick={() => setExpanded(false)} className="text-white">
                <FiChevronsLeft size={20} />
              </button>
            )}
          </div>

          {/* Menu */}
          <div className="space-y-2">
            <SidebarButton
              icon={<FiMessageSquare />}
              label="Dashboard"
              active
              path="/admin/dashboard"
              expanded={expanded}
            />
            <SidebarButton
              icon={<FiSearch />}
              label="Pengguna"
              shortcut="⌘ F"
              expanded={expanded}
            />
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className={`flex items-center justify-between px-3 py-2 w-full rounded ${
                historyOpen ? "bg-[#2e2e2e]" : "hover:bg-[#2e2e2e]"
              }`}
            >
              <div className="flex items-center gap-3">
                <FiBox />
                {expanded && <span>History Chat User</span>}
              </div>
              {expanded && (historyOpen ? <FiChevronUp /> : <FiChevronDown />)}
            </button>

            {/* Submenu */}
            {historyOpen && expanded && (
              <div className="ml-8 space-y-1">
                <SidebarButton
                  label="Website"
                  path="/admin/history/website"
                  expanded={expanded}
                />
                <SidebarButton
                  label="WhatsApp"
                  path="/admin/history/wa"
                  expanded={expanded}
                />
                <SidebarButton
                  label="Telegram"
                  path="/admin/history/telegram"
                  expanded={expanded}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        {expanded ? (
          <div>
            <div className="flex items-center gap-2 p-3 rounded bg-[#2e2e2e] mb-2">
              <img src={avatar} className="w-8 h-8 rounded-full" alt="User" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {user?.name || "Guest"} {/* ✅ dynamic */}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.email || "Belum login"} {/* ✅ dynamic */}
                </p>
              </div>
            </div>

            <div className="flex justify-between px-3 py-2 bg-[#2e2e2e] rounded">
              <button className="text-white text-xs">Light</button>
              <button className="text-gray-500 text-xs">Dark</button>
            </div>
          </div>
        ) : (
          <div className="mb-3 text-center text-xs text-gray-400">▼</div>
        )}
      </div>
    </div>
  );
};

// Sidebar Button
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
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-3 py-2 w-full rounded ${
        active ? "bg-[#2e2e2e]" : "hover:bg-[#2e2e2e]"
      }`}
    >
      {icon}
      {expanded && label}
      {expanded && shortcut && (
        <span className="ml-auto text-[10px] bg-[#3b3b3b] px-2 py-0.5 rounded">
          {shortcut}
        </span>
      )}
    </button>
  );
};

const SidebarItem = ({ label, count, color, selected, icon }) => {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
        selected ? "bg-[#3f3f3f]" : "hover:bg-[#2e2e2e]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            color === "gray"
              ? "bg-gray-500"
              : color === "purple"
              ? "bg-purple-500"
              : color === "blue"
              ? "bg-blue-500"
              : color === "orange"
              ? "bg-orange-500"
              : "bg-white"
          }`}
        ></span>
        <span>{label}</span>
      </div>
      {count && (
        <span className="text-xs bg-[#444] px-2 py-0.5 rounded">{count}</span>
      )}
      {icon && icon}
    </div>
  );
};

export default SidebarAdmin;
