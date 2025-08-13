// SectionHarga.jsx
import Buttons from "../common/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import sa from "../../assets/sa.png";
import CardHarga from "./CardHarga";

const SectionHarga = () => {
  const pricingPlans = [
    {
      title: "Gratis",
      price: "$0",
      description: "Capture ideas and find them quickly",
      features: [
        "Sync unlimited devices",
        "10 GB monthly uploads",
        "200 MB max. note size",
        "Customize Home dashboard and access extra widgets",
        "Connect primary Google Calendar account",
        "Add due dates, reminders, and notifications to your tasks",
      ],
      buttonText: "Mulai",
      highlight: false,
    },
    {
      title: "Pro",
      price: "$11.99",
      description: "Keep home and family on track",
      features: [
        "Sync unlimited devices",
        "10 GB monthly uploads",
        "200 MB max. note size",
        "Customize Home dashboard and access extra widgets",
        "Connect primary Google Calendar account",
        "Add due dates, reminders, and notifications to your tasks",
      ],
      buttonText: "Mulai",
      highlight: true,
    },
    {
      title: "Bisnis",
      price: "$49.99",
      description: "Capture ideas and find them quickly",
      features: [
        "Sync unlimited devices",
        "10 GB monthly uploads",
        "200 MB max. note size",
        "Customize Home dashboard and access extra widgets",
        "Connect primary Google Calendar account",
        "Add due dates, reminders, and notifications to your tasks",
      ],
      buttonText: "Mulai",
      highlight: false,
    },
  ];
  return (
    <div className="w-full px-4 sm:px-[52px] flex flex-col justify-center mb-[20px] items-center h-auto">
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
        {pricingPlans.map((plan, idx) => (
          <CardHarga key={idx} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default SectionHarga;
