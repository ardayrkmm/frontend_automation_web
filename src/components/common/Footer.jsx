import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ tambahkan ini
import Logo from "../../assets/logos.png";
import {
  FiChevronRight,
  FiGlobe,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import Buttons from "./button";
import PolicyModal from "../landing/ModalPol";

const Footer = () => {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate(); // ✅ inisialisasi navigate

  return (
    <footer className="bg-gradient-to-t from-[#37A3FF] to-putih text-white text-sm px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-white/20 pb-10 text-center md:text-left">
        {/* Logo + Deskripsi */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <img src={Logo} alt="Logo" className=" w-[146px]" />
          </div>
          <p className="text-hitam leading-relaxed max-w-xs">
            PT. GIT Solution (GITS) Grha UNIVERSITAS AMIKOM YOGYAKARTA | Gedung
            I lantai 2. Jl. Ring Road Utara, Condong Catur, Depok, Sleman,
            Daerah Istimewa Yogyakarta 55283.
          </p>
        </div>

        {/* Produk */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-hitam">Produk</h3>
          <ul className="space-y-1 text-hitam">
            <li>
              <a href="#fitur" className="hover:text-blue-600 transition">
                Fitur
              </a>
            </li>
            <li>
              <a href="#harga" className="hover:text-blue-600 transition">
                Harga Paket
              </a>
            </li>
            <li>
              <a href="#kisah" className="hover:text-blue-600 transition">
                Kisah Pelanggan
              </a>
            </li>
          </ul>
        </div>

        {/* Sumber daya */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-hitam">Marketing Info</h3>
          <ul className="space-y-1 text-hitam">
            <li>
              <a
                href="https://api.whatsapp.com/send?6281392486333"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                081392486333 - Indra (WA)
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?6285642262008"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                085642262008 - Chandra (WA)
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?6285293921170"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                085293921170 - Hamid (WA)
              </a>
            </li>
          </ul>
        </div>

        {/* Perusahaan */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-hitam">Layanan</h3>
          <ul className="space-y-1 text-hitam">
            <li
              onClick={() => setModal("privacy")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Privacy Policy
            </li>
            <li
              onClick={() => setModal("terms")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Terms & Conditions
            </li>

            {/* ✅ arahkan ke halaman login & daftar */}
            <li
              onClick={() => navigate("/auth/login")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Login
            </li>
            <li
              onClick={() => navigate("/auth/register")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Daftar
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-3 flex flex-col items-center md:items-start">
          <h3 className="font-bold text-hitam text-lg">Cobalah Hari Ini</h3>
          <p className="text-hitam max-w-xs">
            Tambahkan seluruh tim Anda seiring bertambahnya kebutuhan Anda.
          </p>
          <Buttons
            variant="secondary"
            className="secondary w-[216px] h-[60px] text-[20px]"
          >
            Mulai Sekarang
          </Buttons>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-hitam text-xs text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
          <span className="flex items-center gap-1">
            <FiGlobe /> Indonesia
          </span>
          <span>Terms & privacy</span>
          <span>Security</span>
          <span>Status</span>
          <span>©2025 PT.GIT Solution.</span>
        </div>

        <div className="flex gap-4 text-white text-lg justify-center">
          <FiFacebook className="hover:text-blue-300 cursor-pointer" />
          <FiTwitter className="hover:text-blue-300 cursor-pointer" />
          <FiLinkedin className="hover:text-blue-300 cursor-pointer" />
        </div>
      </div>

      {/* Modal */}
      {modal === "privacy" && (
        <PolicyModal
          title="Privacy Policy"
          content={
            <>
              <p>
                Kami menjaga privasi pengguna dengan serius dan tidak akan
                membagikan data pribadi tanpa izin.
              </p>
              <p>
                Informasi yang dikumpulkan hanya digunakan untuk peningkatan
                layanan dan pengalaman pengguna.
              </p>
            </>
          }
          onClose={() => setModal(null)}
        />
      )}

      {modal === "terms" && (
        <PolicyModal
          title="Terms & Conditions"
          content={
            <>
              <p>
                Dengan menggunakan layanan ini, Anda setuju untuk mematuhi
                syarat dan ketentuan yang berlaku.
              </p>
              <p>
                GeniusAI berhak memperbarui ketentuan tanpa pemberitahuan
                sebelumnya.
              </p>
            </>
          }
          onClose={() => setModal(null)}
        />
      )}
    </footer>
  );
};

export default Footer;
