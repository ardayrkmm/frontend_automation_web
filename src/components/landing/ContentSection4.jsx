import React from "react";
import SectionTile from "./SectionTile";
import ig from "../../assets/ig.png";

const features = [
  {
    title: "Omnichannel Platforms",
    desc: "Otomatisasi percakapan di Instagram! Balas DM secara instan dengan keywords tertentu.",
  },
  {
    title: "Prompt & Flows System",
    desc: "Selain Prompt sederhana, kamu juga bisa buat Gitbots jadi lebih canggih dengan Logika kompleks menggunakan fitur Flows hanya dengan drag & drop.",
  },
  {
    title: "Manajemen Chat Satu Halaman",
    desc: "Pantau percakapan Whatsapp, Facebook Messenger, Instagram, Telegram dan Webchat Gitbots hanya dengan satu halaman.",
  },
  {
    title: "Kanban Boards CRM",
    desc: "Lacak prospek dan transaksi secara visual dengan papan Kanban. Tetapkan prioritas, kelola tahapan, dan tutup transaksi lebih cepat dengan drag-and-drop yang intuitif.",
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
                <img src={ig} className="w-[50px]" alt="" />
              </div>
            </div>

            <h2 className="mt-6 text-xl font-serif font-bold text-[#1e1e1e] leading-snug text-center">
              {feature.title}
            </h2>

            <p className="mt-4 text-sm text-gray-700 text-center">
              {feature.desc}
            </p>
          </SectionTile>
        ))}
      </div>
    </section>
  );
}
