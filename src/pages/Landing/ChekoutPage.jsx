import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createCheckout, resetCheckout } from "../../features/chekoutSlice";
import { ambilPrice } from "../../features/pricingSlice";
import { useParams, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { plans, loading: loadingPlans } = useSelector(
    (state) => state.pricing
  );
  const {
    order,
    loading: loadingCheckout,
    error,
  } = useSelector((state) => state.checkout);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const token = localStorage.getItem("token");

  // 🔹 Ambil data harga jika belum tersedia
  useEffect(() => {
    if (!plans || plans.length === 0) {
      dispatch(ambilPrice());
    }
  }, [dispatch, plans]);

  // 🔹 Log untuk debug
  useEffect(() => {
    console.log("ID dari URL:", id);
    console.log("Daftar plans:", plans);
  }, [plans, id]);

  // 🔹 Temukan plan berdasarkan ID dari URL dan ubah harga ke integer
  useEffect(() => {
    if (plans && plans.length > 0) {
      const found = plans.find((p) => String(p.id) === String(id));
      if (found) {
        const cleanPrice = parseInt(
          found.price.toString().replace(/[^\d]/g, ""), // hapus semua karakter non-angka
          10
        );
        setSelectedPlan({
          ...found,
          price: cleanPrice, // 💰 simpan harga dalam bentuk integer
        });
      }
    }
  }, [plans, id]);

  // 🔹 Proses checkout
  const handleCheckout = () => {
    if (!token) {
      console.log("Token tidak ada, menuju ke /auth/login");
      navigate("/auth/login");
      return;
    }

    // Kirim plan_id dan token, bisa juga kirim price jika backend butuh
    dispatch(
      createCheckout({
        plan_id: id,
        token,
        price: selectedPlan?.price, // 💵 kirim harga integer ke backend
      })
    );
  };

  // 🔹 Redirect setelah berhasil buat order
  useEffect(() => {
    if (order && order.payment_url) {
      window.location.href = order.payment_url;
    }
  }, [order]);

  // 🔹 Bersihkan state saat keluar
  useEffect(() => {
    return () => dispatch(resetCheckout());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Loading */}
      {(loadingPlans || loadingCheckout) && (
        <p className="text-gray-600 text-lg">Memuat data...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 text-lg mb-4">Terjadi kesalahan: {error}</p>
      )}

      {/* Ringkasan Plan */}
      {!loadingPlans && selectedPlan && !order && (
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">
            Ringkasan Checkout
          </h2>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {selectedPlan.name}
          </p>
          <p className="text-2xl font-bold text-blue-700 mb-4">
            {(() => {
              // ubah ke number bersih dulu
              const cleanPrice = parseInt(
                selectedPlan.price.toString().replace(/[^\d]/g, ""),
                10
              );
              // tampilkan format rupiah
              return `Rp ${cleanPrice.toLocaleString("id-ID")}`;
            })()}
          </p>

          <p className="text-gray-500 mb-6">
            Paket harga terbaik untuk kebutuhanmu.
          </p>

          <ul className="text-gray-700 text-left mb-6 list-disc list-inside">
            {selectedPlan.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all"
          >
            Lanjutkan Pembayaran
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full mt-3 bg-gray-200 text-gray-800 font-medium py-3 rounded-xl hover:bg-gray-300 transition-all"
          >
            Kembali
          </button>
        </div>
      )}

      {/* Jika plan tidak ditemukan */}
      {!loadingPlans && !selectedPlan && !error && (
        <p className="text-gray-600 text-lg">Paket tidak ditemukan.</p>
      )}
    </div>
  );
};

export default CheckoutPage;
