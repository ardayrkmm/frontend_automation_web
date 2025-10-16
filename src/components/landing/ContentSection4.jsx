import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeatures } from "../../features/LandingFiturSlice";
import SectionTile from "./SectionTile";

export default function FeaturesSection() {
  const dispatch = useDispatch();
  const {
    items: fiturs,
    loading,
    error,
  } = useSelector((state) => state.fiturs);

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center mt-8">Memuat fitur...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Gagal memuat fitur: {error}</p>
    );
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-inter text-hitam font-bold text-[32px] md:text-[40px] lg:text-[50px] text-center leading-tight">
        Fitur Unggulan yang Kami Tawarkan
      </h1>

      <div
        className="grid gap-8 mt-10 justify-items-center
                   grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
      >
        {fiturs.map((feature, index) => (
          <SectionTile key={index}>
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFF1DA] rounded-md -z-10"></div>
              <div className="w-14 h-14 flex items-center justify-center rounded-xl">
                <img
                  src={`https://chatbot.gitstraining.com/${feature.gambar}`}
                  className="w-[150px]"
                  alt={feature.title}
                />
              </div>
            </div>

            <h2 className="mt-6 text-xl font-serif font-bold text-[#1E1D4C] leading-snug text-center">
              {feature.title}
            </h2>

            <p className="mt-4 text-sm text-[#5E6282] text-center">
              {feature.desc}
            </p>
          </SectionTile>
        ))}
      </div>
    </section>
  );
}
