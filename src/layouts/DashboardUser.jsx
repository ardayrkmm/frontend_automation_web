import Sidebar from "../components/dashboard/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarUser from "../components/dashboard/SideBarUser";

const DashboardUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleNewChat = () => {
    setActiveChatId(null); // reset jadi chat baru
  };
  return (
    <div className="flex h-screen bg-[#141718] text-white">
      {/* Sidebar */}
      <SidebarUser
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        onSelectChat={(id) => setActiveChatId(id)}
        onNewChat={handleNewChat}
      />

      {/* Mobile toggle button */}
      {/* Mobile toggle button */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-auto z-10 ">
        <Outlet context={{ activeChatId }} />
      </div>
    </div>
  );
};

export default DashboardUser;
