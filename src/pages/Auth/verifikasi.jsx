// import React, { useState } from "react";
// import AuthLayout from "../../layouts/authLayout";
// import { Link, useNavigate } from "react-router-dom";
// import Buttons from "../../components/common/button";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyCode } from "../../features/authSlice";
// import gogel from "../../assets/gogel.png";

// const Verifikasi = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, error, isVerified } = useSelector((state) => state.auth);

//   const [code, setCode] = useState("");

//   const handleVerifyClick = (e) => {
//     e.preventDefault();
//     dispatch(verifyCode(code))
//       .unwrap()
//       .then(() => {
//         navigate("/dashboard"); // pindah setelah sukses
//       })
//       .catch((err) => {
//         console.error("Verifikasi gagal:", err);
//       });
//   };

//   return (
//     <AuthLayout>
//       <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-10 gap-10">
//         {/* Kiri */}
//         <div className="z-10 p-[20px] hidden md:block">
//           <h2 className="text-[75px] font-bold mb-4">Verifikasi</h2>
//           <p className="text-gray-600 mb-6 text-[35px]">
//             Enter your code verifikasi
//           </p>
//           <p className="text-[16px] text-gray-700">
//             Belum mendapatkan Kode?
//             <Link to="/auth/register" className="text-yellow-500 font-semibold">
//               Kirim Lagi
//             </Link>
//           </p>
//         </div>

//         {/* Kanan */}
//         <div className="flex flex-col items-center space-y-6">
//           <h2 className="text-3xl font-semibold text-black">Verifikasi</h2>
//           <form
//             className="flex flex-col items-center space-y-4"
//             onSubmit={handleVerifyClick}
//           >
//             <input
//               type="text"
//               name="code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//               placeholder="Enter Kode Verifikasi"
//               className="w-[369px] h-[62px] px-4 py-3 rounded-md bg-gradient-to-r from-[#A7CEFC] to-[#637B96] text-black placeholder-white focus:outline-none"
//             />

//             <Buttons
//               type="submit"
//               className="w-[369px] h-[59px] bg-yellow-400 text-white hover:bg-yellow-500"
//               variant="secondary"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Verify"}
//             </Buttons>
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="text-center text-sm text-gray-600 mt-2">
//               or continue with
//             </div>
//             <div className="flex justify-center mt-1">
//               <button type="button" className="border rounded-full p-2">
//                 <img src={gogel} alt="Google" className="w-6 h-6" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </AuthLayout>
//   );
// };

// export default Verifikasi;
