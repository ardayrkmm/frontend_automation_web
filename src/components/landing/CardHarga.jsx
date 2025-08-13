// CardHarga.jsx
import React from "react";
import Buttons from "../common/button";
import list from "../../assets/list.png";
import list2 from "../../assets/listT.png";

const CardHarga = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlight,
}) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-lg shadow-lg border p-6 w-full max-w-sm transition-all
      ${highlight ? "bg-white border-blue-200" : "bg-white border-gray-200"}
      `}
    >
      {/* Title & Price */}
      <div>
        <h2
          className={`text-lg font-semibold ${
            highlight ? "text-blue-600" : "text-gray-800"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-3xl sm:text-4xl font-bold mt-2 ${
            highlight ? "text-blue-900" : "text-gray-900"
          }`}
        >
          {price}
        </p>
        <p className="text-sm sm:text-base text-gray-500 mt-1">{description}</p>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span>
                {highlight ? (
                  <img src={list2} alt="" className="h-[18px] sm:h-[20px]" />
                ) : (
                  <img src={list} alt="" className="h-[18px] sm:h-[20px]" />
                )}
              </span>
              <span
                className={`${
                  highlight ? "text-blue-800" : "text-gray-700"
                } text-sm sm:text-base`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <Buttons
        className={`mt-8 w-[100px] sm:w-[120px] h-[45px] sm:h-[51px] rounded-lg py-2 font-medium transition-all
        ${
          highlight
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-white text-kuning border border-yellow-300 hover:bg-yellow-50"
        }`}
      >
        {buttonText}
      </Buttons>
    </div>
  );
};

export default CardHarga;
