import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ambilPrice } from "../../features/pricingSlice";
import CardHarga from "./CardHarga";
import sa from "../../assets/sa.png";

const SectionHarga = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.pricing);

  useEffect(() => {
    dispatch(ambilPrice());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-gray-600">Memuat harga...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Gagal memuat data: {error}</p>
    );

  return (
    <div
      id="harga"
      className="w-full px-4 sm:px-[52px] flex flex-col justify-center mb-[20px] items-center h-auto"
    >
      <h2 className="text-[28px] sm:text-[32px] md:text-[72px] font-bold text-hitam mb-4 text-center">
        <span className="relative z-[10] inline-block">
          Investasi Rekrut Gitbots
          <img
            src={sa}
            alt=""
            className="absolute bottom-0 right-[30px] w-full h-[80px] sm:h-[156px] object-contain -z-10"
          />
        </span>
      </h2>
      <p className="text-[16px] sm:text-[18px] text-hitam text-inter mb-[20px] text-center">
        Dibawah standar gaji karyawan loh.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full justify-items-center">
        {plans.map((plan, idx) => (
          <CardHarga
            key={idx}
            id={plan.id}
            title={plan.name}
            price={`Rp.${plan.price}`}
            description="Paket harga terbaik untukmu"
            features={plan.features}
            buttonText="Mulai"
            highlight={idx === 1} // Misalnya paket ke-2 di-highlight
          />
        ))}
      </div>
    </div>
  );
};

export default SectionHarga;
