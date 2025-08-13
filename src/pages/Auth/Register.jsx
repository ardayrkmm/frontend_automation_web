import React from "react";
import AuthLayout from "../../layouts/authLayout";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import gogel from "../../assets/gogel.png";
import Buttons from "../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice"; // pastikan path benar

const HalamanRegis = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "", // sesuai backend
    email: "",
    phone_number: "", // sesuai backend
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [successMessage, setSuccessMessage] = React.useState(null); // ✅ pesan suks
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    // Hanya kirim data yang dibutuhkan backend
    const payload = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
    };
    try {
      // Tunggu hasil registerUser
      await dispatch(registerUser(payload)).unwrap();
      // Kalau sukses, redirect ke halaman verifikasi
      setSuccessMessage(
        "Registrasi berhasil! Silakan cek email untuk verifikasi."
      );
      navigate("/auth/login");
    } catch (err) {
      console.error("Register gagal:", err);
    }
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-10 gap-10">
        <div className="z-10 p-[20px] hidden md:block">
          <h2 className="text-[75px] font-bold mb-4">Sign up to</h2>
          <p className="text-gray-600 mb-6 text-[35px]">
            Come on, create your account now!
          </p>
          <p className="text-[16px] text-gray-700">
            Jika Anda sudah memiliki akun, Anda bisa{" "}
            <Link to="/auth/login" className="text-yellow-500 font-semibold">
              Login disini !
            </Link>
          </p>
        </div>

        <div className="flex flex-col text-start items-center space-y-6">
          <h2 className="text-3xl font-semibold text-black">Sign Up</h2>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-[369px] h-[62px] px-4 py-3 rounded-md bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black placeholder-white focus:outline-none"
            />
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-[369px] h-[62px] px-4 py-3 rounded-md bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black placeholder-white focus:outline-none"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Enter Contact Number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-[369px] h-[62px] px-4 py-3 rounded-md bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black placeholder-white focus:outline-none"
            />

            <div className="relative w-[369px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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
            <div className="relative w-[369px]">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Buttons
              type="submit"
              className="w-[369px] h-[59px] bg-yellow-400 text-white hover:bg-yellow-500"
              variant="secondary"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Buttons>

            <div className="text-center text-sm text-gray-600 mt-2">
              or continue with
            </div>
            <div className="flex justify-center mt-1">
              <button type="button" className="border rounded-full p-2">
                <img src={gogel} alt="Google" className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default HalamanRegis;
