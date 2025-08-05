import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Landing/Home"; // Untuk landing page
import HomeDas from "./pages/Dashboard/HomeDash"; // Buat khusus dashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout untuk Landing Page */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="homedas" element={<HomeDas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
