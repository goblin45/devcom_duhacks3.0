import { useNavigate } from "react-router-dom";

import "./collabCard.css";

import { ChatIconSVG, ConnectIconSVG } from "../../assets/ForConnect";
import {
  ReactSvg,
  CppSvg,
  JsSvg,
  JavaSvg,
  SpringBootSvg,
} from "../../assets/SkillSetSVG2";
import { useState } from "react";
import toast from "react-hot-toast";

const CollabCard = ({ cardDetails }) => {
  const navigate = useNavigate();
  const [connPending, setConnPending] = useState(false);

  return (
    <div className="collab-card h-[250px] flex flex-col justify-between items-center text-white rounded-md font-devcom">
      <div className="h-1/2 w-full flex gap-4 items-center px-5">
        <img
          src="https://i.pinimg.com/736x/b3/04/40/b304408f6711cd1fa4fa119eacde9a6b.jpg"
          className="h-16 w-16 rounded-full overflow-hidden"
        />
        <div className="flex flex-col justify-between">
          <span className="text-2xl truncate">{cardDetails?.name}</span>
          <span className="collab-desc text-sm font-devcomthin">
            {cardDetails?.email}
          </span>
        </div>
      </div>
      <div className="h-1/2 w-full">
        <div className="collab-highlighter h-12 py-1 px-4 flex items-center justify-start gap-2 w-full">
          <div className="flex items-center justify-center w-10 h-10 p-2">
            {ReactSvg}
          </div>
          <div className="flex items-center justify-center w-10 h-10 p-2">
            {CppSvg}
          </div>
          <div className="flex items-center justify-center w-10 h-10 p-2">
            {JsSvg}
          </div>
          <div className="flex items-center justify-center w-10 h-10 p-2">
            {JavaSvg}
          </div>
          <div className="flex items-center justify-center w-10 h-10 p-2">
            {SpringBootSvg}
          </div>
        </div>
        <div className="h-[calc(100%-3rem)] w-full px-4 flex justify-between items-center">
          <div
            className="to-chat-button w-2/5 h-8 rounded-md px-2 py-1 flex items-center justify-center gap-2 hover:cursor-pointer"
            onClick={() =>
              navigate("/chat", { state: { chatId: cardDetails.chatId } })
            }
          >
            <ChatIconSVG />
            <span className="text-sm font-devcomthin">chat</span>
          </div>
          <div className="to-connect-button w-2/5 h-8 bg-custom-green px-2 py-1 flex rounded-md gap-1 hover:cursor-pointer">
            <ConnectIconSVG />
            <span onClick={()=>{
              if(connPending){
                toast.success("Connection request removed");
                setConnPending(false);
              }else{
                toast.success("Connection sent");
                setConnPending(true);
              }
            }} className="text-black text-sm font-devcomthin">{connPending ? "Pending" : "Connect"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollabCard;
