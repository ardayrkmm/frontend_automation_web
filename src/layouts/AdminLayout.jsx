import Sidebar from "../components/dashboard/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarAdmin from "../components/admin/SideBarAdmin";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-putih text-white">
      {/* Sidebar */}
      <SidebarAdmin isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
