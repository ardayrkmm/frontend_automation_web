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
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar_3.png";
import logo from "../../assets/logos.png";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar, onSelectChat, onNewChat }) => {
  const [expanded, setExpanded] = useState(true); // toggle width

  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const updateHistory = () => {
      const saved = JSON.parse(localStorage.getItem("chatHistory")) || [];
      setChatHistory(saved);
    };

    window.addEventListener("storage", updateHistory);

    updateHistory(); // load awal

    return () => window.removeEventListener("storage", updateHistory);
  }, []);

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
              label="Chats"
              active
              expanded={expanded}
              onClick={onNewChat}
            />
            <SidebarButton
              icon={<FiSearch />}
              label="Search"
              shortcut="⌘ F"
              expanded={expanded}
            />
            <SidebarButton
              icon={<FiBox />}
              label="Manage subscription"
              expanded={expanded}
            />
            <SidebarButton
              icon={<FiSettings />}
              label="Updates & FAQ"
              expanded={expanded}
            />
            <SidebarButton
              icon={<FiSettings />}
              label="Settings"
              expanded={expanded}
            />
          </div>

          {/* Chat list */}

          {/* Chat list dari localStorage */}
          {/* Chat list dari localStorage */}
          <div className="mt-6 flex flex-col">
            <p className="uppercase text-gray-400 text-xs mb-2">Chat history</p>
            <div className="overflow-y-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-biru scrollbar-track-transparent">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className="flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-[#2e2e2e]"
                >
                  <div className="flex items-center gap-2">
                    <FiMessageSquare />
                    <span className="truncate max-w-[160px]">{chat.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
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

export default Sidebar;
