import React, { useEffect, useRef, useState } from "react";
import { centerItem } from "../../../utils/utils";
import messagesData from "../../../constants/messagesData";
import * as iconsData from "../../../constants/iconsData";
import ScreenTopPart from "../screenShards/ScreenTopPart";
import ScreenMiddlePart from "../screenShards/ScreenMiddlePart";
import ScreenBottomPart from "../screenShards/ScreenBottomPart";
import { io } from "socket.io-client";

const Screen = ({ userData, handleIcons, whichToShow }) => {
  const [messageReceived, setMessageReceived] = useState("");
  const [socket, setSocket] = useState(null);
  const containerToScroll = useRef(null);
  const [roomInfo, setRoomInfo] = useState([])
  useEffect(() => {
    const newSocket = io("http://localhost:5174");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleRoomInfo = (data) => {
    setRoomInfo(data)
  }

  const handleReceivedMessage = (data) => {
    setMessageReceived(data);
  };

  const htmlData = {
    topPart: <ScreenTopPart handleIcons={handleIcons} socket={socket} iconsData={iconsData} userData={userData} />,
    middlePart: (
      <ScreenMiddlePart
        socket={socket}
        messageReceived={messageReceived}
        iconsData={iconsData}
        whichToShow={whichToShow}
        handleIcons={handleIcons}
        userData={userData}
        containerToScroll={containerToScroll}
        handleRoomInfo={handleRoomInfo}
      />
    ),
    bottomPart: (
      <ScreenBottomPart
        socket={socket}
        handleReceivedMessage={handleReceivedMessage}
        iconsData={iconsData}
        userData={userData}
        containerToScroll={containerToScroll}
        roomInfo={roomInfo}
      />
    ),
  };

  return (
    <div
      className={`w-full lg:w-[60%] h-[100vh] lg:h-full rotateSpace transition-all ${centerItem()}`}
    >
      <div
        className={`w-[80%] h-[90%] overflow-hidden bg-black/80 rounded-[40px] shadow-lg shadow-black`}
      >
        {messagesData.screenParts.map((_, i) => {
          return (
            <div className={`w-full ${i === 1 ? "h-[80%]" : "h-[10%]"}`}>
              {i === 0
                ? htmlData.topPart
                : i === 1
                ? htmlData.middlePart
                : htmlData.bottomPart}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Screen;
