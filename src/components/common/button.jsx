import React from "react";

const Buttons = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "sedang",
  className = "",
  sizeTexts = "sm",
  ...props
}) => {
  const baseStyles =
    "rounded-lg font-medium transition-all font-serif cursor-pointer";
  const varian = {
    primary:
      "bg-gradient-to-t from-[#063369] to-[#4F9CF9] text-[#ffffff] font-serif",
    secondary: "bg-kuning hover:bg-kuning text-[#043873] font-serif",
  };

  const ukuran = {
    kecil:
      "px-[16px] mr-[10px] py-[6px] font-serif h-[40px] text-[18px] flex items-center justify-center",
    sedang:
      "px-[14px] mr-[10px] py-[6px] font-serif h-[40px] text-[18px] flex items-center justify-center",
    besar:
      "px-[20px] mr-[10px] w-[352px] h-[60px] py-[18.5px] text-[18px] flex items-center justify-center",
  };

  const sizeText = {
    s: "text-[18px] font-inter text-[#043873]",
    sm: "text-[18px] font-inter text-white",
    sb: "text-[18px] text-inter",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${varian[variant]} ${ukuran[size]} ${className}`}
      {...props}
    >
      <span className={`${sizeText[sizeTexts]} flex items-center gap-2`}>
        {children}
      </span>
    </button>
  );
};

export default Buttons;
