import React from "react";
import sa from "../../assets/saw.png";

const ContentSection = ({
  title,
  description,
  buttonText,
  image, // bisa single image atau array
  reverse,
  extraContent,
}) => {
  return (
    <div
      id="bisnis"
      className={`flex mt-[20px] flex-col-reverse md:flex-row ${
        reverse ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-between gap-8 py-12`}
    >
      {/* Teks */}
      <div className="w-full md:w-1/2 px-[54px]">
        <h2 className="text-[32px] md:text-[52px] font-bold text-hitam mb-4">
          <span className="relative z-[10] inline-block">
            {title}
            <img
              src={sa}
              alt=""
              className="absolute bottom-[-30px] left-0 w-[120%] md:w-[130%] h-auto -z-10 object-contain"
            />
          </span>
        </h2>

        <p className="text-hitam text-[16px] md:text-[18px] mb-6">
          {description}
        </p>

        {buttonText && (
          <button className="bg-biru text-white px-6 py-3 rounded-md hover:opacity-90 transition">
            {buttonText}
          </button>
        )}

        {extraContent && <div className="mt-4">{extraContent}</div>}
      </div>

      {/* Gambar (dinamis & responsif) */}
      <div className="w-full md:w-1/2 px-4 flex justify-center flex-wrap gap-4">
        {Array.isArray(image) ? (
          image.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`section-${index}`}
              className="w-full sm:w-[80%] md:w-auto max-w-full h-auto max-h-[400px] md:max-h-[600px] object-contain"
            />
          ))
        ) : (
          <img
            src={image}
            alt="section"
            className="w-full sm:w-[80%] md:w-auto max-w-full h-auto max-h-[400px] md:max-h-[600px] object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default ContentSection;
