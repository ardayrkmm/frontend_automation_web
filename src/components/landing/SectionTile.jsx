import React from "react";
import bgOren from "../../assets/il1.png";

const SectionTile = ({ judul, deskripsi }) => {
  return (
    <div className="p-4 max-w-xs text-center sm:text-left">
      {/* Judul dengan coretan background */}
      <h2
        className="text-[18px] sm:text-[20px] text-hitam font-bold inline-block bg-no-repeat bg-left-top"
        style={{
          backgroundImage: `url(${bgOren})`,
          backgroundSize: "contain",
          padding: "0.2rem 0.5rem",
        }}
      >
        {judul}
      </h2>

      {/* Deskripsi */}
      <p className="mt-4 text-hitam leading-relaxed text-sm sm:text-base">
        {deskripsi}
      </p>
    </div>
  );
};

export default SectionTile;
