import Buttons from "../common/button";
import bots from "../../assets/bot.png";

const Headers = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center px-[54px] justify-between">
      <div className="flex-initial w-full lg:w-[700px] p-[20px]">
        <h1 className="text-biru text-inter font-bold text-[26px] md:text-[26px] lg:text-[60px] xl:text-[60px]">
          Halo, Saya Gitbots Ada Yang Bisa Saya Bantu?
        </h1>
        <p className="text-biru text-inter font-light text-[18px] md:text-[22px] lg:text-[28px] xl:text-[28px] mb-[30px]">
          Solusi AI serba bisa untuk bisnis, edukasi, customer service, dan
          pengembangan konten.
        </p>

        <Buttons variant="primary" className="w-[231px] h-[63px] mt-[30px]">
          Coba Chatbot Gratis
        </Buttons>
      </div>
      <div className="flex-initial ml-0 lg:ml-[20px] mb-[20px] lg:mb-0">
        <img src={bots} alt="" className="w-full max-w-[600px] h-auto" />
      </div>
    </div>
  );
};

export default Headers;
