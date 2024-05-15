import React, { useEffect, useState } from "react";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import IconComponent from "../../../components/IconComponent";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import { useSelector } from "react-redux";
import { neededRoom } from "../repAxiosMethods";
import serverRoutes from "../../../constants/serverRoutes";

const ScreenMiddlePart = ({
  userData,
  handleIcons,
  whichToShow,
  iconsData,
  socket,
  containerToScroll,
  handleRoomInfo,
}) => {
  const { userPayload } = useSelector((state) => state.authReducer);
  const [socketMessages, setSocketMessages] = useState([]);
  const handleIconsInteraction = () => {
    handleIcons(0);
  };

  useEffect(() => {
    if (userData.data) {
      const roomId = [userPayload._id, userData?.data[userData.i]?._id];
      const reversedRoomId = [userData?.data[userData.i]?._id, userPayload._id];
      
      try {
        const getRelatedMessages = async () => {
          const theRoom = await neededRoom(
            roomId,
            reversedRoomId,
            userPayload,
            userData
          );
          handleRoomInfo(theRoom);
          socket.emit("join_room", theRoom?.data[0]?.roomId);
          const res = await dynamicAxiosMethod({
            method: "get",
            shouldToken: true,
            endpoint: `${serverRoutes.get.getMessageById}${roomId.join(
              ""
            )}-${reversedRoomId.join("")}`,
          });
          if (await res.status === 200) {
            setSocketMessages(res.data);
          } else {
            setSocketMessages([]);
          }
        };
        getRelatedMessages();
      } catch (error) {
        setSocketMessages([]);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      setSocketMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    if (containerToScroll.current) {
      containerToScroll.current.scrollTo({
        top: containerToScroll.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [socketMessages, containerToScroll]);

  return (
    <div className={`w-full h-full bg-black`}>
      {typeof userData.i !== "number" ? (
        <div
          onClick={handleIconsInteraction}
          className={`${centerItem()} w-full h-full transition-all ${
            whichToShow !== 0 ? "cursor-pointer hover:bg-black/50" : ""
          } flex-col`}
        >
          <IconComponent
            classes={`text-[9rem] text-white/50`}
            Icon={iconsData[whichToShow === 0 ? "FaUserFriends" : "BsQuestion"]}
          />
          <p
            className={`w-[80%] ${titleStyles(
              "text-4xl"
            )} leading-[5rem] ${gradient(true, gradientColors.PRIMARY)}`}
          >
            {whichToShow === 0 && userData !== null
              ? "Choose a friend from the friend list"
              : userData.length === 0
              ? "Add a friend to start chatting!"
              : "Click to start a chat"}
          </p>
        </div>
      ) : (
        <div ref={containerToScroll} className={`overflow-y-scroll h-full`}>
          {socketMessages?.map((msg, i) => {
            const date = new Date(msg.createdAt);
            return (
              <div
                className={`${centerItem(
                  "",
                  userPayload._id === msg.sender ? "items-end" : "items-start"
                )} w-[80%] m-auto flex-col p-4`}
              >
                <div
                  className={`w-[60%] min-h-[10vh] ${
                    userPayload._id === msg.sender
                      ? `${bgColors.PRIMARY} rounded-br-lg`
                      : "bg-gray-500/10 rounded-bl-lg"
                  } my-5 pl-5 pt-6 ${textColors.PRIMARY} rounded-full`}
                >
                  <p>{msg.Message}</p>
                </div>
                <p className={`text-white/30`}>
                  Sent {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScreenMiddlePart;
