import React from "react";

const SectionTile = ({ children }) => {
  return (
    <div className="relative group w-[299px] h-[347px]">
      {/* Ornamen kuning di belakang */}
      <div className="absolute bottom-[6.5px] -left-[50px] w-[100px] h-[100px] bg-yellow-400 rounded-tl-[50%] scale-0 group-hover:scale-100 transition-transform duration-300 z-0"></div>

      {/* Card */}
      <div className="relative p-[20px] w-full h-full flex flex-col items-center justify-center text-center rounded-[36px] hover:bg-white shadow-md transition-all duration-300  hover:-translate-y-2 z-10">
        {children}
      </div>
    </div>
  );
};

export default SectionTile;
