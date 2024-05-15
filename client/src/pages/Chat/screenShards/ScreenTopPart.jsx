import React, { useEffect, useState } from "react";
import { centerItem, gradient } from "../../../utils/utils";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import putCorrectDataForRank from "../../../helpers/putCorrectDataForRank";
import IconComponent from "../../../components/IconComponent";
import { useSelector } from "react-redux";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";
import serverRoutes from "../../../constants/serverRoutes";
import isMobileDevice from "../../../helpers/isMobile";

const ScreenTopPart = ({ userData, iconsData, socket, handleIcons }) => {
  const { userPayload } = useSelector((state) => state.authReducer);
  const dynamicDisptach = useDynamicDispatch();
  const [statuses, setStatuses] = useState([]);
  useEffect(() => {
    if (!socket) return;
    socket.emit("userConnected", userPayload._id);

    socket.on("userStatus", ({ userId, status, socketId }) => {
      setStatuses((prevStatuses) => {
        if (status === "offline") {
          return prevStatuses.filter((user) => user.socketId !== socketId);
        } else {
          return [...prevStatuses, { userId, socketId, status }];
        }
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleDelete = async () => {
    isMobileDevice();
    dynamicDisptach("OPEN_DIALOG", {
      dialogType: "areYouSure",
    });
    dynamicDisptach("SET_AXIOS_DATA", {
      method: "patch",
      shouldToken: true,
      innerData: " ",
      endpoint: `${serverRoutes.patch.addUser}${
        userData?.data[userData.i]._id
      }`,
    });
    handleIcons(2);
  };

  return (
    <div
      className={`${centerItem("justify-around")} ${bgColors.PRIMARY} h-full`}
    >
      {typeof userData.i === "number" && (
        <>
          <div className={`w-1/2 h-full ${centerItem("justify-start")} gap-4`}>
            <IconComponent
              classes={`text-4xl animate-spin slowe ${textColors.PRIMARY}`}
              Icon={
                putCorrectDataForRank(userData?.data[userData.i]?.userData.Rank)
                  .icon
              }
            />
            <h1
              className={`text-2xl lg:text-5xl ${gradient(
                true,
                gradientColors.PRIMARY
              )} tShadow`}
            >
              {userData?.data[userData.i]?.userData.Username}
            </h1>
            <div
              className={`w-[1vmin] h-[1vmin] ${
                bgColors[
                  statuses.some(
                    (key) => key.userId === userData?.data[userData.i]._id
                  )
                    ? "ACCEPT"
                    : "DENY"
                ]
              } animate-ping rounded-full`}
            ></div>
          </div>
          <h3 h3 className="text-white/50 animate-pulse">
            <span
              className={`text-2xl ${
                textColors[
                  statuses.some(
                    (key) => key.userId === userData?.data[userData.i]._id
                  )
                    ? "ACCEPT"
                    : "DENY"
                ]
              } tShadow`}
            >
              {statuses.some(
                (key) => key.userId === userData?.data[userData.i]._id
              )
                ? "ONLINE"
                : "OFFLINE"}
            </span>
          </h3>
          <IconComponent
            onClick={handleDelete}
            classes={`${textColors.DENY} text-2xl p-4 hover:bg-gray-500/20 cursor-pointer rounded-full`}
            Icon={iconsData["AiOutlineUserDelete"]}
          />
        </>
      )}
    </div>
  );
};

export default ScreenTopPart;
