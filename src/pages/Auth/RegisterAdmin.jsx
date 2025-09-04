import React from "react";
import AuthLayout from "../../layouts/authLayout";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import gogel from "../../assets/gogel.png";
import Buttons from "../../components/common/button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";

const RegisterAdmin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [successMessage, setSuccessMessage] = React.useState(null);
  const [validationErrors, setValidationErrors] = React.useState({});
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Regex Validasi
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Format email tidak valid!";
    }
    if (!validatePhone(formData.phone_number)) {
      errors.phone_number = "Nomor HP harus 10–15 digit angka.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password dan konfirmasi tidak sama!";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
    };

    try {
      await dispatch(registerUser(payload))
        .unwrap()
        .then(() => {
          setSuccessMessage("Register Berhasil Silahkan Cek Email✅"); // 🔹 Tampilkan pesan sukses
          setTimeout(() => {
            setSuccessMessage(""); // 🔹 Hilangkan pesan setelah 2 detik
            navigate("/auth/login");
          }, 6000);
        });

      setSuccessMessage(
        "Registrasi berhasil! Silakan cek email untuk verifikasi."
      );

      setTimeout(() => {
        navigate("/auth/login");
      }, 6000); // kasih jeda 2 detik
    } catch (err) {
      console.error("Register gagal:", err);
    }
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-10 gap-10">
        {/* Left Section */}
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

        {/* Right Section */}
        <div className="flex flex-col text-start items-center space-y-6">
          <h2 className="text-3xl font-semibold text-black">Sign Up</h2>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={`w-[369px] h-[62px] px-4 py-3 rounded-md 
                bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black 
                placeholder-white focus:outline-none
                ${validationErrors.email ? "border-2 border-red-500" : ""}`}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              className="w-[369px] h-[62px] px-4 py-3 rounded-md 
              bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black 
              placeholder-white focus:outline-none"
            />

            {/* Phone */}
            <input
              type="text"
              name="phone_number"
              placeholder="Enter Contact Number"
              value={formData.phone_number}
              onChange={handleChange}
              className={`w-[369px] h-[62px] px-4 py-3 rounded-md 
                bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black 
                placeholder-white focus:outline-none
                ${
                  validationErrors.phone_number ? "border-2 border-red-500" : ""
                }`}
            />
            {validationErrors.phone_number && (
              <p className="text-red-500 text-sm">
                {validationErrors.phone_number}
              </p>
            )}

            {/* Password */}
            <div className="relative w-[369px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[62px] px-4 py-3 rounded-md 
                bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black 
                placeholder-white focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative w-[369px]">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full h-[62px] px-4 py-3 rounded-md 
                  bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black 
                  placeholder-white focus:outline-none
                  ${
                    validationErrors.confirmPassword
                      ? "border-2 border-red-500"
                      : ""
                  }`}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700"
                onClick={togglePassword}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {validationErrors.confirmPassword}
              </p>
            )}

            {/* Notifikasi */}
            {successMessage && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                {successMessage}
              </div>
            )}
            {error && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 animate-fade-in">
                {error}
              </div>
            )}

            {/* Button */}
            <Buttons
              type="submit"
              className="w-[369px] h-[59px] bg-yellow-400 text-white hover:bg-yellow-500"
              variant="secondary"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Buttons>

            {/* Divider */}
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

export default RegisterAdmin;
