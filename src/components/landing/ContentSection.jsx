import React from "react";
import sa from "../../assets/sa.png";
const ContentSection = ({ title, description, buttonText, image, reverse }) => {
  return (
    <div
      className={`flex flex-col-reverse md:flex-row ${
        reverse ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-between gap-8 py-12`}
    >
      <div className="w-full md:w-1/2 px-[54px]">
        <h2 className="text-[32px] md:text-[52px] font-bold text-hitam mb-4">
          <span className="relative inline-block">
            {title}
            <img
              src={sa}
              alt=""
              className="absolute bottom-0 right-[30px] w-full h-[32px] object-contain -z-10"
            />
          </span>
        </h2>
        <p className="text-hitam text-[16px] md:text-[18px] mb-6">
          {description}
        </p>
        <button className="bg-biru text-white px-6 py-3 rounded-md hover:opacity-90 transition">
          {buttonText}
        </button>
      </div>

      <div className="w-full md:w-1/2 px-4 flex justify-center">
        <img src={image} alt="section" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default ContentSection;
