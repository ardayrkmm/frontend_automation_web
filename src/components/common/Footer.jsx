import React from "react";
import Logo from "../../assets/Logo.png";
import {
  FiChevronRight,
  FiGlobe,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";
import Buttons from "./button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#37A3FF] to-putih text-white text-sm px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-white/20 pb-10 text-center md:text-left">
        {/* Logo + Deskripsi */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <img src={Logo} alt="Logo" className="h-[62px] w-[146px]" />
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
            <li>Ringkasan</li>
            <li>Harga Paket</li>
            <li>Kisah pelanggan</li>
          </ul>
        </div>

        {/* Sumber daya */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-hitam">Sumber daya</h3>
          <ul className="space-y-1 text-hitam">
            <li>Blog</li>
            <li>Panduan & tutorial</li>
            <li>Pusat bantuan</li>
          </ul>
        </div>

        {/* Perusahaan */}
        <div className="space-y-2 flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-hitam">Perusahaan</h3>
          <ul className="space-y-1 text-hitam">
            <li>Tentang kami</li>
            <li>Karier</li>
            <li>Peralatan media</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-3 flex flex-col items-center md:items-start">
          <h3 className="font-bold text-hitam text-lg">Cobalah Hari Ini</h3>
          <p className="text-hitam max-w-xs">
            Tambahkan seluruh tim Anda seiring bertambahnya kebutuhan Anda.
          </p>
          <Buttons className="primary w-[216px] h-[60px] text-[20px]">
            Mulai Sekarang
          </Buttons>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-hitam text-xs text-center md:text-left">
        {/* Kiri */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
          <span className="flex items-center gap-1">
            <FiGlobe /> Indonesia
          </span>
          <span>Terms & privacy</span>
          <span>Security</span>
          <span>Status</span>
          <span>©2025 PT.GIT Solution.</span>
        </div>

        {/* Sosmed */}
        <div className="flex gap-4 text-white text-lg justify-center">
          <FiFacebook className="hover:text-blue-300 cursor-pointer" />
          <FiTwitter className="hover:text-blue-300 cursor-pointer" />
          <FiLinkedin className="hover:text-blue-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
