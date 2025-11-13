import React, { useState } from "react";
import AuthLayout from "../../layouts/authLayout";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import gogel from "../../assets/gogel.png";
import Buttons from "../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import Config from "../../api/config";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(""); // 🔹 Tambah state notifikasi

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleGoogleLogin = () => {
    window.location.href = `${Config.API_BASE_URL}/user/login/google`;
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    dispatch(loginUser(form))
      .unwrap()
      .then(() => {
        setSuccessMessage("Login Berhasil ✅"); // 🔹 Tampilkan pesan sukses
        setTimeout(() => {
          setSuccessMessage(""); // 🔹 Hilangkan pesan setelah 2 detik
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        console.error("Login gagal:", err);
      });
  };

  return (
    <AuthLayout>
      {/* 🔹 Notifikasi sukses */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-10 gap-10">
        {/* Kiri */}
        <div className="z-10 p-[20px] hidden md:block">
          <h2 className="text-[75px] font-bold mb-4">Sign in to</h2>
          <p className="text-gray-600 mb-6 text-[35px]">
            Enter your email and password to continue.
          </p>
          <p className="text-[16px] text-gray-700">
            Jika Anda belum memiliki akun, Anda bisa{" "}
            <Link to="/auth/register" className="text-yellow-500 font-semibold">
              Register disini !
            </Link>
          </p>
        </div>

        {/* Kanan */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-semibold text-black">Sign in</h2>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleLoginClick}
          >
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email or user name"
              className="w-[369px] h-[62px] px-4 py-3 rounded-md bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black placeholder-white focus:outline-none"
            />
            <div className="relative w-[369px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full h-[62px] px-4 py-3 rounded-md bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black placeholder-white focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="w-[369px] text-right text-sm text-gray-500">
              <Link to="/auth/reset" className="hover:underline">
                Forgot password ?
              </Link>
            </div>
            <Buttons
              type="submit"
              className="w-[369px] h-[59px] bg-yellow-400 text-white hover:bg-yellow-500"
              variant="secondary"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Buttons>
            {error && <p className="text-red-500">{error}</p>}
            <div className="text-center text-sm text-gray-600 mt-2">
              or continue with
            </div>
            <div className="flex justify-center mt-1">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="border rounded-full p-2"
              >
                <img src={gogel} alt="Google" className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
