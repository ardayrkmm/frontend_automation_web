import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createCheckout, resetCheckout } from "../../features/chekoutSlice";
import { useParams, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading, error } = useSelector((state) => state.checkout);

  // 🔹 Ambil token user dari localStorage (misal setelah login)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(createCheckout({ plan_id: id, token }));
    } else {
      navigate("/login");
    }

    return () => dispatch(resetCheckout());
  }, [dispatch, id, token, navigate]);

  useEffect(() => {
    if (order && order.payment_url) {
      navigate("/user/dashboard");
    }
  }, [order]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {loading && <p className="text-gray-600 text-lg">Membuat pesanan...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}
      {!loading && !order && !error && (
        <p className="text-gray-700">Menyiapkan checkout...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
