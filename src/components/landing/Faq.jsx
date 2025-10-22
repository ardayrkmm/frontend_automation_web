import React, { useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

import Buttons from "../common/button";

const FAQ = () => {
  const faqData = [
    {
      question: "Apa itu Gitbots?",
      answer:
        "Gitbots adalah platform AI yang menyediakan layanan otomatisasi untuk berbagai kebutuhan bisnis, seperti Customer service, CRM, Sales, dan lainnya. Gitbots bekerja 24/7 tanpa lelah dan dapat disesuaikan dengan kebutuhan bisnismu.",
    },
    {
      question: "Bagaimana cara Gitbots membantu bisnis saya?",
      answer:
        "Gitbots membantu bisnis dengan memberikan layanan customer service otomatis, menangani ribuan interaksi pelanggan secara bersamaan, mengelola CRM dan leads, serta membantu meningkatkan penjualan melalui otomatisasi.",
    },
    {
      question: "Apakah Gitbots bisa diintegrasikan?",
      answer:
        "Tentu saja! Gitbots dapat disesuaikan dengan budaya dan strategi bisnismu. Kami akan melakukan setup AI sesuai dengan kebutuhan spesifik bisnismu.",
    },
    {
      question: "Apakah Gitbots bisa di akses kapan saja?",
      answer:
        "Ya, Gitbots siap bekerja 24/7 tanpa henti, menangani setiap tugas tanpa perlu istirahat atau lembur.",
    },
    {
      question: "Bagaimana keamanan data saya?",
      answer:
        "Kami memprioritaskan keamanan data dengan protokol legal dan enkripsi tingkat tinggi.",
    },
    {
      question: "Apakah Gitbots hanya untuk bisnis besar?",
      answer:
        "Tidak. Gitbots dirancang untuk UMKM, startup, corporate, hingga pemerintahan.",
    },
    {
      question: "Bagaimana cara mulai menggunakan Gitbots?",
      answer:
        "Cukup daftar, pilih paket layanan, lakukan setup AI, dan Gitbots langsung siap kerja.",
    },
    {
      question: "Apakah saya bisa mencoba Gitbots?",
      answer: "Ya, ada uji coba gratis 14 hari sebelum berlangganan.",
    },
  ];

  // bikin array of false sesuai jumlah FAQ
  const [openArray, setOpenArray] = useState(Array(faqData.length).fill(false));

  const toggleFAQ = (index) => {
    setOpenArray((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <div
      id="faq"
      className="w-full px-4 py-4 sm:px-[52px] flex flex-col justify-start items-start h-auto bg-gradient-to-t from-[#B0B0B0] to-putih"
    >
      <h2 className="text-[40px] md:text-[56px] text-hitam font-bold text-start mb-6">
        Pertanyaan yang sering di tanyakan :
      </h2>
      {/* grid biar 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Kolom kiri */}
        <div className="space-y-4">
          {faqData
            .filter((_, i) => i % 2 === 0) // ambil index genap
            .map((item, index) => {
              const realIndex = index * 2; // mapping ke index asli
              return (
                <div key={realIndex} className="w-full">
                  {/* Pertanyaan */}
                  <div className="w-full rounded-lg shadow-sm bg-white">
                    <button
                      onClick={() => toggleFAQ(realIndex)}
                      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium hover:bg-gray-100 transition"
                    >
                      <span>{item.question}</span>
                      <span className="ml-2">
                        {openArray[realIndex] ? <FaMinus /> : <FaPlus />}
                      </span>
                    </button>
                  </div>

                  {/* Jawaban dipisah */}
                  {openArray[realIndex] && (
                    <div className="mt-2 p-4 rounded-lg text-putih bg-[#2B2D2BF5] flex justify-between items-center">
                      <span>{item.answer}</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Kolom kanan */}
        <div className="space-y-4">
          {faqData
            .filter((_, i) => i % 2 === 1) // ambil index ganjil
            .map((item, index) => {
              const realIndex = index * 2 + 1; // mapping ke index asli
              return (
                <div key={realIndex} className="w-full">
                  {/* Pertanyaan */}
                  <div className="w-full rounded-lg shadow-sm bg-white">
                    <button
                      onClick={() => toggleFAQ(realIndex)}
                      className="w-full flex justify-between items-center p-4 text-left text-lg font-medium hover:bg-gray-100 transition"
                    >
                      <span>{item.question}</span>
                      <span className="ml-2">
                        {openArray[realIndex] ? <FaMinus /> : <FaPlus />}
                      </span>
                    </button>
                  </div>

                  {/* Jawaban (pisah dari card pertanyaan) */}
                  {openArray[realIndex] && (
                    <div className="mt-2 p-4 rounded-lg text-putih bg-[#2B2D2BF5]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
