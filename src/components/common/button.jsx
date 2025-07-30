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
    primary: "bg-[#4F9CF9] hover:bg-[#398FF9] text-[#ffffff] font-serif",
    secondary: "bg-[#FFE492] hover:bg-[#FFD95C] text-[#043873] font-serif",
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
    s: "text-[18px] font-serif text-[#043873]",
    sm: "text-[18px] font-seriftext-white",
    sb: "text-[18px] text-inter",
  };
  return (
    <div
      type={type}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.(e);
        }
      }}
      className={`${baseStyles} ${varian[variant]} ${ukuran[size]} ${className}`}
      {...props}
    >
      <h1 className={`${sizeText[sizeTexts]}`}>{children}</h1>
    </div>
  );
};
export default Buttons;
