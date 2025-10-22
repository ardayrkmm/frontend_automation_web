import sa from "../../assets/sa.png";
import sponsor from "../../assets/sponsors.png";
const ContentClient = () => {
  return (
    <div
      id="kisah"
      className="w-full px-4 sm:px-[52px] flex flex-col justify-center mb-[20px] items-center h-auto"
    >
      <h2 className="text-[32px] md:text-[72px] font-bold text-hitam mb-4">
        <span className="relative z-[10] inline-block">
          Our Clients
          <img
            src={sa}
            alt=""
            className="absolute bottom-0 right-[30px] w-full h-[56px] object-contain -z-10"
          />
        </span>
      </h2>

      <img src={sponsor} alt="" />
    </div>
  );
};

export default ContentClient;
