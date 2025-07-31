import Buttons from "../common/button";

const ContentSection2 = () => {
  return (
    <div className="w-full px-4 sm:px-[52px] flex flex-col justify-center items-center h-auto sm:h-[544px] bg-biruGelap relative text-center">
      <div className="p-4 sm:p-[32px] m-auto flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-inter text-putih mb-4 leading-tight">
          Kerjaan Aman, Diakses di Mana Aja
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-putih font-light text-inter mb-6 max-w-xl">
          Mau di laptop, HP, atau tablet — AI siap bantu kamu kerja lebih cepat,
          kapan saja, di mana saja.
        </p>
        <Buttons className="w-[160px] sm:w-[203px] h-[50px] sm:h-[63px] text-sm sm:text-base">
          Coba Gratis
        </Buttons>
      </div>
    </div>
  );
};

export default ContentSection2;
