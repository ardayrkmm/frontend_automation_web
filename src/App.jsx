import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivatesRoute";

import Home from "./pages/Landing/Home";
import HomeDas from "./pages/Dashboard/HomeDash";
import Login from "./pages/Auth/Login";
import HalamanRegis from "./pages/Auth/Register";
import Reset from "./pages/Auth/reset";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/DashBoard";
import DashboardAdmin from "./pages/admin/DashBoard";
import AdminChats from "./pages/admin/ChatHistory";
import Whachat from "./pages/admin/ChatHistoriWa";
import LoginAdmin from "./pages/Auth/LoginAdmin";

import HRegisterAdmin from "./pages/Auth/RegisterAdmin";
import DashboardUser from "./layouts/DashboardUser";
import BroadcastPage from "./pages/DashboardUser/BroadcastPage";
import ChatbotBuilder from "./pages/DashboardUser/ChatbotBuilder";
import PaketTagihan from "./pages/DashboardUser/PaketUser";
import CheckoutPage from "./pages/Landing/ChekoutPage";
import HalDashboardUser from "./pages/DashboardUser/DashboardUser";
import UserList from "./pages/admin/Pengguna";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Landing Page */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/chatbot" element={<DashboardLayout />}>
          {/* index = default child */}
          <Route index element={<HomeDas />} />
          <Route path="homedas" element={<HomeDas />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {/* index = default child */}
          <Route index element={<DashboardAdmin />} />
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="dashboard/pengguna" element={<UserList />} />
          <Route path="history/website" element={<AdminChats />} />
          <Route path="history/wa" element={<Whachat />} />
        </Route>

        <Route path="/user" element={<DashboardUser />}>
          {/* index = default child */}
          <Route index element={<HalDashboardUser />} />
          <Route path="dashboard" element={<HalDashboardUser />} />
          <Route path="dashboard/broadcast" element={<BroadcastPage />} />
          <Route path="dashboard/chatbot" element={<ChatbotBuilder />} />
          <Route path="dashboard/paket" element={<PaketTagihan />} />
        </Route>
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<HalamanRegis />} />
        <Route path="/auth/reset" element={<Reset />} />
        <Route path="/auth/admin/login" element={<LoginAdmin />} />
        <Route path="/auth/admin/register" element={<HRegisterAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
