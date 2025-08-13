import React from "react";
import SectionTile from "./SectionTile";

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
  {
    title: "CRM Automation",
    desc: "Otomatiskan penyimpanan database dengan rapi, kirim pesan terjadwal, dan analisis data pelanggan secara otomatis.",
  },
  {
    title: "Sosial Media Automation",
    desc: "Balas komentar dengan DM otomatis di Facebook & Instagram, sekaligus catat Pixel Ads Meta untuk strategi marketing yang lebih optimal.",
  },
  {
    title: "Broadcast Pesan",
    desc: "Sebarkan pesan promosi bisnismu ke Whatsapp, Instagram, Facebook, Telegram hingga Email pelangganmu, tanpa takut di banned.",
  },
  {
    title: "Report Data Real-Time",
    desc: "Sajikan data pelanggan secara real-time dan otomatis input ke Google Spreadsheets untuk analisis bisnis yang lebih efektif.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-putih rounded-[50px] p-[20px] lg:grid-cols-4 gap-8 justify-items-center">
        {features.map((feature, idx) => (
          <SectionTile
            key={idx}
            judul={feature.title}
            deskripsi={feature.desc}
          />
        ))}
      </div>
    </section>
  );
}
