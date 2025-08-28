import Buttons from "../common/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import Ilustrasi from "../../assets/ils.png"; // contoh path ilustrasi
import Ilustrasi2 from "../../assets/BACKGROUND.png"; // contoh path ilustrasi

const ContentSection2 = () => {
  return (
    <div className="w-full px-4 sm:px-[52px] flex flex-col justify-center items-center h-auto sm:h-[544px] bg-gradient-to-t from-[#ffffff] to-[#0081CF] relative text-center overflow-hidden">
      {/* ilustrasi background */}
      <img
        src={Ilustrasi}
        alt="Ilustrasi Background"
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[1200px] opacity-90 z-0"
      />
      <img
        src={Ilustrasi2}
        alt="Ilustrasi s"
        className="absolute top-[50%] right-[90%] -translate-x-1/2 -translate-y-1/2 w-[80px] sm:w-[150px] opacity-90 z-0"
      />

      <div className="p-4 sm:p-[32px] m-auto flex flex-col items-center relative z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-inter text-putih mb-4 leading-tight">
          Bergabunglah Menjadi Agency!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-putih font-light text-inter mb-6 max-w-xl">
          Ajak bisnis bertransformasi dengan Gitbots dan nikmati komisi sebesar
          10% setiap bulan selama client berlangganan, dan tambahan 100%
          pendapatan dari jasa setup ai.
        </p>
        <Buttons className="w-[160px] sm:w-[203px] h-[50px] sm:h-[63px] text-sm sm:text-base">
          Join Sekarang <IoIosArrowRoundForward />
        </Buttons>
      </div>
    </div>
  );
};

export default ContentSection2;
