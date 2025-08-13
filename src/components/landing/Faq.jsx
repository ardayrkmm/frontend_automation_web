// src/components/FAQ.jsx
import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowRoundForward,
} from "react-icons/io";
import Buttons from "../common/button";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Apa itu Gitbots?",
      answer:
        "Gitbots adalah platform AI yang menyediakan layanan otomatisasi untuk berbagai kebutuhan bisnis, seperti Customer service, CRM, Sales, dan lainnya. Gitbots bekerja 24/7 tanpa lelah dan dapat disesuaikan dengan kebutuhan bisnismu.",
    },
    {
      question: "Bagaimana cara Gitbots membantu bisnis saya?",
      answer:
        "Gitbots membantu bisnis dengan memberikan layanan customer service otomatis,menangani ribuan interaksi pelanggan secara bersamaan, mengelola CRM dan leads, serta membantu meningkatkan penjualan melalui otomatisasi. Ini membantu menghemat waktu, biaya, dan tenaga.",
    },
    {
      question:
        "Apakah Gitbots bisa diintegrasikan dengan platform yang sudah saya gunakan?",
      answer:
        "Tentu saja! Gitbots dapat disesuaikan dengan budaya dan strategi bisnismu. Kami akan melakukan setup AI sesuai dengan kebutuhan spesifik bisnismu, mulai dari bahasa, tone komunikasi, hingga strategi penanganan pelanggan.",
    },
    {
      question: "Apakah Gitbots bisa di akses kapan saja?",
      answer:
        "Ya, Gitbots siap bekerja 24/7 tanpa henti, menangani setiap tugas tanpa perlu istirahat atau lembur, sehingga bisnismu tetap berjalan dengan lancar kapan saja.",
    },
    {
      question: "Bagaimana keamanan data saya jika menggunakan Gitbots",
      answer:
        "Kami memprioritaskan keamanan data. Semua interaksi dan data pelanggan dikelola oleh protokol yang legal dengan keamanan tingkat tinggi untuk memastikan privasi dan keamanan informasi bisnismu.",
    },
    {
      question: "Apakah Gitbots hanya untuk bisnis besar?",
      answer:
        "Tidak. Gitbots dirancang untuk berbagai jenis bisnis, baik UMKM, startup, corporate, hingga pemerintahan. Setiap paket layanan kami disesuaikan untuk memenuhi kebutuhan skala bisnis yang berbeda-beda.",
    },
    {
      question: "Bagaimana cara mulai menggunakan Gitbots?",
      answer:
        "Kamu hanya perlu mendaftar di platform kami, memilih paket layanan yang sesuai, dan melakukan setup AI. Setelah itu, Gitbots siap langsung bekerja untuk bisnismu!",
    },
    {
      question: " Apakah saya bisa mencoba Gitbots sebelum berlangganan?",
      answer:
        "Kamu bisa mendapakatkan uji coba gratis 14 hari dan melakukan setup AI. Setelah itu, Gitbots siap langsung bekerja untuk bisnismu!",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full px-4 py-4 sm:px-[52px] flex flex-col justify-start items-start h-auto bg-gradient-to-t from-[#B0B0B0] to-putih">
      <h2 className="text-[56px] text-hitam font-bold text-start mb-6">
        Pertanyaan yang sering di tanyakan :
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="w-[1300px] max-w-none rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center p-4 text-left text-lg font-medium hover:bg-gray-100 transition"
            >
              <span className="mr-2">
                {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
              {item.question}
            </button>
            {openIndex === index && (
              <div className="p-4 text-hitam">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
      <Buttons
        variant="primary"
        className="text-white rounded-[8px] font-serif mt-[20px]"
      >
        Baca Selengkapnya <IoIosArrowRoundForward />
      </Buttons>
    </div>
  );
};

export default FAQ;
