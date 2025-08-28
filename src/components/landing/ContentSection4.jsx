import React from "react";
import SectionTile from "./SectionTile";
import broad from "../../assets/sate.png";
import wa from "../../assets/ws.png";
import pesan from "../../assets/wa.png";
import promp from "../../assets/promp.png";

const features = [
  {
    title: "Omnichannel Platfroms",
    gambar: wa,
    desc: "Nikmati kemudahan mengelola percakapan pelanggan dengan balasan otomatis yang cepat, rapi, dan aktif. 24/7.",
  },
  {
    title: "Manajemen Chat Satu Halaman",
    gambar: pesan,
    desc: "Pantau percakapan Whatsapp, Facebook Messenger, Instagram, Telegram hanya dengan satu halaman.",
  },
  {
    title: "Broadcase Pesan",
    gambar: broad,
    desc: "Sebarkan pesan promosi bisnismu ke Whatsapp, Instagram, Facebook, Telegram, tanpa takut di banned.",
  },
  {
    title: "Prompt & Flow System",
    gambar: promp,
    desc: "Selain Prompt sederhana, kamu juga bisa buat Genius AI jadi lebih canggih dengan Logika kompleks menggunakan fitur Flows hanya dengan drag & drop.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-inter text-hitam font-bold text-[32px] md:text-[40px] lg:text-[50px] text-center leading-tight">
        Fitur Unggulan yang Kami Tawarkan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 justify-items-center">
        {features.map((feature, index) => (
          <SectionTile key={index}>
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFF1DA] rounded-md -z-10"></div>
              <div className="w-14 h-14 flex items-center justify-center rounded-xl">
                <img src={feature.gambar} className="w-[150px]" alt="" />
              </div>
            </div>

            <h2 className="mt-6 text-xl font-serif font-bold text-[#1E1D4C] leading-snug text-center">
              {feature.title}
            </h2>

            <p className="mt-4 text-sm text-[#5E6282] text-center">
              {feature.desc}
            </p>
          </SectionTile>
        ))}
      </div>
    </section>
  );
}
