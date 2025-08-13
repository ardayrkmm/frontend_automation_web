import Headers from "../../components/landing/Header";
import bgWave from "../../assets/BACKGROUND.png";
import ContentSection from "../../components/landing/ContentSection";
import gambarS1 from "../../assets/il3.png";
import gambarS4 from "../../assets/ds4.png";
import ContentSection2 from "../../components/landing/ContentSection2";
import ContentSection3 from "../../components/landing/ContentSection3";
import TestimonialSection from "../../components/landing/Testi";
import FeaturesSection from "../../components/landing/ContentSection4";
import SectionHarga from "../../components/landing/SectionHarga";
import ContentClient from "../../components/landing/SectionClient";
import FAQ from "../../components/landing/Faq";

const Home = () => {
  return (
    <div className="relative">
      <img
        src={bgWave}
        alt="background"
        className="absolute top-[300px] left-[20px] transform -translate-x-1/2 w-[200px] sm:w-[200px] md:w-[300px] lg:w-[400px] h-[500px] -z-10"
      />
      <div className="w-full px-0 mx-0">
        <Headers />

        <div className="bg-gradient-to-t from-[#4F9CF9] to-putih relative ">
          {/* Section dengan posisi absolute */}
          <div className="relative top-[-85px]">
            <FeaturesSection />
          </div>

          <ContentSection
            title="Selesaikan Masalah Pelanggan dari A-Z!"
            description="Bukan sekedar tanya jawab, Gitbots bisa bantu untuk identifikasi masalah, sampai menyelesaikan masalah..."
            image={gambarS1}
            reverse={false}
            extraContent={
              <p
                className="text-putih cursor-pointer"
                onClick={() => console.log("Load more clicked!")}
              >
                Lihat Demo..
              </p>
            }
          />
        </div>

        <ContentSection
          title="Multi-Knowledge!"
          description="Dengan Pekerja.ai, satu akun Whatsapp atau sosial media lainnya dapat menangani berbagai jenis informasi dan kebutuhan bisnis. Dari customer service, sales, hingga support.
Semua terintegrasi dalam satu AI yang cerdas dan responsif"
          image={gambarS1}
          reverse={true}
          extraContent={
            <p
              className="text-biru cursor-pointer"
              onClick={() => console.log("Load more clicked!")}
            >
              Lihat Demo..
            </p>
          }
        />

        <SectionHarga />
        <ContentSection2 />
        <ContentSection
          title="100% data anda"
          description="Kami menjamin kerahasiaan dan keamanan penuh atas semua data Anda. Tidak digunakan untuk pelatihan AI. Tidak dibagikan ke pihak ketiga."
          buttonText="Baca Selengkapnya"
          image={gambarS4}
          reverse={true}
        />
        <ContentClient />
        <FAQ />
        <ContentSection3 />
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
