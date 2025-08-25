import Buttons from "../common/button";
import bots from "../../assets/logos.png";
import { IoIosArrowRoundForward } from "react-icons/io";

const Headers = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center px-[32px] py-[100px] justify-between">
      <div className="flex-initial w-full lg:w-[750px] p-[20px]">
        <h1 className="text-hitam text-inter font-bold text-[26px] md:text-[26px] lg:text-[60px] xl:text-[60px]">
          Smart Conversations, Smarter Decisions.
        </h1>
        <p className="text-hitam text-inter font-light text-[18px] md:text-[22px] lg:text-[18px] xl:text-[18px] mb-[30px]">
          Agen AI dengan fast response saja tidak cukup. Di Indonesia, kamu
          butuh AI yang bisa menganalisa percakapan serta memahami budaya dan
          kebiasaan orang Indonesia.
        </p>

        <Buttons variant="primary" className="w-[231px] h-[63px] mt-[30px]">
          Coba Chatbot Gratis <IoIosArrowRoundForward />
        </Buttons>
      </div>
      <div className="flex-initial ml-0 lg:ml-[20px] mb-[20px] lg:mb-0">
        <img src={bots} alt="" className="w-full max-w-[600px] h-auto" />
      </div>
    </div>
  );
};

export default Headers;
