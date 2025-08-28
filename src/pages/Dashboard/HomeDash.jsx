import { useOutletContext } from "react-router-dom";
import Chatbot from "../../components/dashboard/chatbot";

const HomeDash = () => {
  const { activeChatId } = useOutletContext();
  return (
    <div className="bg-putih rounded-[20px] flex flex-row h-[500px]">
      <div className="flex-1">
        <Chatbot activeChatId={activeChatId} />
      </div>
    </div>
  );
};

export default HomeDash;
