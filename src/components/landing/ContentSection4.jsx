import SectionTile from "./SectionTile";
import gambar1 from "../../assets/WhatsApp.png";
import gambar2 from "../../assets/wa.png";
import gambar3 from "../../assets/sate.png";
import gambar4 from "../../assets/flow.png";
export default function FeaturesSection() {
  const staticFeatures = [
    {
      title: "Omnichannel Platforms",
      desc: "Balas pesan pelanggan otomatis dan kirim broadcast...",
      gambar: gambar1,
    },
    {
      title: "Manajemen Chat Satu Halaman",
      desc: "WhatsApp, Telegram, dan banyak platform dalam satu...",
      gambar: gambar2,
    },
    {
      title: "BroadCast",
      desc: "Otomatisasi balasan, alur, dan broadcast pesan.",
      gambar: gambar3,
    },
    {
      title: "Prompt & Flow System",
      desc: "Selain Prompt sederhana, kamu juga bisa buat Geniu...",
      gambar: gambar4,
    },
  ];

  return (
    <section id="fitur" className="py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-inter text-hitam font-bold text-[32px] md:text-[40px] lg:text-[50px] text-center leading-tight">
        Fitur Unggulan yang Kami Tawarkan
      </h1>

      <div
        className="grid gap-8 mt-10 justify-items-center
                   grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
      >
        {staticFeatures.map((feature, index) => (
          <SectionTile key={index}>
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFF1DA] rounded-md -z-10"></div>
              <div className="w-14 h-14 flex items-center justify-center rounded-xl">
                <img
                  src={feature.gambar}
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
