import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./routes/PrivatesRoute";

import Home from "./pages/Landing/Home";
import HomeDas from "./pages/Dashboard/HomeDash";
import Login from "./pages/Auth/Login";
import HalamanRegis from "./pages/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Landing Page */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Layout Dashboard (terproteksi) */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="homedas" element={<HomeDas />} />
          </Route>
        </Route>

        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<HalamanRegis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
