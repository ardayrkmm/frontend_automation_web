import Buttons from "../common/button";
import img1 from "../../assets/dsa.png";
import Elemen from "../../assets/Element.png";

const ContentSection3 = () => {
  return (
    <div className="w-full bg-biruGelap relative overflow-hidden">
      <img
        src={Elemen}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-40"
      />

      <div className="relative z-10 px-4 sm:px-[52px] py-[30px] sm:py-[70px] flex flex-col sm:flex-row justify-center items-center h-auto sm:h-[544px] text-center sm:text-left">
        <div className="w-full sm:basis-1/2 flex justify-center sm:justify-start">
          <img
            src={img1}
            className="w-[300px] sm:w-[582px] h-auto sm:h-[470px]"
            alt="Integrasi App"
          />
        </div>

        {/* Teks */}
        <div className="w-full sm:basis-1/2 p-4 sm:p-[32px] flex flex-col items-center sm:items-start justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-putih mb-4 leading-tight">
            Tersambung dengan Aplikasi <br /> yang Anda Gunakan Setiap Hari
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-putih font-light mb-6 max-w-xl">
            Integrasi Lengkap untuk Proyek yang Sukses
          </p>
          <Buttons className="w-[160px] sm:w-[203px] h-[50px] sm:h-[63px] text-sm sm:text-base">
            Baca Selengkapnya
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default ContentSection3;
