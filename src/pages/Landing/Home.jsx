import Headers from "../../components/landing/Header";
import bgWave from "../../assets/BACKGROUND.png";
import ContentSection from "../../components/landing/ContentSection";
import gambarS1 from "../../assets/ds.png";
import gambarS4 from "../../assets/ds4.png";
import ContentSection2 from "../../components/landing/ContentSection2";
import ContentSection3 from "../../components/landing/ContentSection3";
import TestimonialSection from "../../components/landing/Testi";

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
        <ContentSection
          title="Upload Dokumen, Video, & Gambar"
          description="Cukup unggah file Anda — PDF, dokumen Word, presentasi, gambar, hingga video. Asisten AI kami akan membaca isinya dan menjawab pertanyaan, meringkas, atau menjelaskan konten secara instan."
          buttonText="Get Started"
          image={gambarS1}
          reverse={true}
        />
        <ContentSection
          title="Kolaborasi tim + kecerdasan AI"
          description="Bekerja lebih cerdas bersama tim Anda. Undang anggota tim ke workspace bersama dan biarkan AI membantu semua orang menyusun, merevisi, atau menjawab pertanyaan secara instan."
          buttonText="Try It Now"
          image={gambarS1}
          reverse={false}
        />
        <ContentSection
          title="AI Cerdas Sesuai Gaya Anda"
          description="Asisten AI kami menyesuaikan diri dengan alur kerja Anda. Unggah dokumen, pilih gaya komunikasi, atur tugas khusus — dan sesuaikan dengan kebutuhan Anda. Cocok untuk pebisnis, pengajar, kreator konten, atau siapa saja yang ingin bekerja lebih efisien dengan bantuan AI."
          buttonText="Lets Go"
          image={gambarS1}
          reverse={true}
        />
        <ContentSection2 />
        <ContentSection
          title="100% data anda"
          description="Kami menjamin kerahasiaan dan keamanan penuh atas semua data Anda. Tidak digunakan untuk pelatihan AI. Tidak dibagikan ke pihak ketiga."
          buttonText="Baca Selengkapnya"
          image={gambarS4}
          reverse={true}
        />
        <ContentSection3 />
        <TestimonialSection />
      </div>
    </div>
  );
};

export default Home;
