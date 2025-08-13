import Buttons from "../common/button";
import { IoIosArrowRoundForward } from "react-icons/io";
const ContentSection2 = () => {
  return (
    <div className="w-full px-4 sm:px-[52px] flex flex-col justify-center items-center h-auto sm:h-[544px] bg-gradient-to-t from-[#E6F1FE] to-[#37A3FF] relative text-center">
      <div className="p-4 sm:p-[32px] m-auto flex flex-col items-center">
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
