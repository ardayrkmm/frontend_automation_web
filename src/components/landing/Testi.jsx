import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/avatar_3.png";
const testimonials = [
  {
    text: `“Awalnya saya hanya coba-coba, tapi sekarang chatbot ini bantu saya menjawab pertanyaan pelanggan 24 jam tanpa lelah. Sangat hemat waktu dan tenaga!”`,
    name: "Andini Putri",
    role: "Owner Kedai Kopi Ruang Tengah",
    image: img1,
    stars: 5,
    bg: "bg-white",
    textColor: "text-black",
  },
  {
    text: `“Integrasi API-nya cepat dan dokumentasinya jelas. Kami gunakan AI-nya untuk auto-reply di platform edukasi kami. Highly recommended.”`,
    name: "Fajar Nugraha",
    role: "CTO Edutech Local",
    image: img1,
    stars: 5,
    bg: "bg-biru",
    textColor: "text-putih",
  },
  {
    text: `“Saya pakai chatbot ini buat bantu murid memahami materi pelajaran. Cukup upload dokumen, AI langsung bisa bantu menjelaskan dengan bahasa yang mudah dimengerti.”`,
    name: "Rina Kurniawati",
    role: "Guru Bahasa Inggris",
    image: img1,
    stars: 5,
    bg: "bg-biru",
    textColor: "text-putih",
  },
  {
    text: `“Tim support-nya juga sangat responsif. Fitur-fiturnya sangat membantu dalam otomasi layanan pelanggan kami.”`,
    name: "Bayu Saputra",
    role: "Manager IT",
    image: img1,
    stars: 4,
    bg: "bg-biru",
    textColor: "text-putih",
  },
  {
    text: `“AI-nya bisa belajar dari dokumen internal kami, jadi jawabannya makin akurat. Mantap!”`,
    name: "Siti Nurhaliza",
    role: "Admin CS Online",
    image: img1,
    stars: 5,
    bg: "bg-biru",
    textColor: "text-putih",
  },
];

const TestimonialSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const cardsPerPage = 3;

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev - cardsPerPage < 0 ? 0 : prev - cardsPerPage
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + cardsPerPage >= testimonials.length ? prev : prev + cardsPerPage
    );
  };

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className="w-full px-4 sm:px-10 py-16 bg-white text-center">
      <h2 className="text-3xl sm:text-[62px] font-bold text-hitam mb-2">
        Pengguna Kami, Cerita Mereka
      </h2>
      <div className="w-24 h-2 bg-kuning mx-auto mb-10 rounded-lg" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
          {visibleTestimonials.map((t, i) => (
            <div
              key={i}
              className={`p-6 ${t.bg} rounded-xl shadow-md text-left`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <p className={`italic mb-[49px] ${t.textColor}`}>{t.text}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-semibold ${t.textColor}`}>{t.name}</p>
                  <p className={`text-sm ${t.textColor}`}>{t.role}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(t.stars)].map((_, s) => (
                    <span key={s} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol navigasi */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={handlePrev}
            className="bg-[#4F9CF9] hover:bg-[#3F93F9FF] p-3 rounded-full shadow-md"
          >
            <FiChevronLeft className="text-2xl text-[##4F9CF9]" />
          </button>
          <button
            onClick={handleNext}
            className="bg-[#4F9CF9] hover:bg-[#3F93F9FF] p-3 rounded-full shadow-md"
          >
            <FiChevronRight className="text-2xl text-[##4F9CF9]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
