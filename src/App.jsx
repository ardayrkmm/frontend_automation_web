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
          <Route path="history/website" element={<AdminChats />} />
          <Route path="history/wa" element={<Whachat />} />
        </Route>

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
