import React, { useEffect } from "react";
import { bgColors, textColors } from "../../../constants/colorsData";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import { centerItem } from "../../../utils/utils";
import IconComponent from "../../../components/IconComponent";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import { useSelector } from "react-redux";
import serverRoutes from "../../../constants/serverRoutes";

const ScreenBottomPart = ({
  userData,
  iconsData,
  handleReceivedMessage,
  socket,
  containerToScroll,
  roomInfo,
}) => {
  const { userPayload } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => handleReceivedMessage(data));
  }, [socket]);

  var handleSend = async () => {
    try {
      if (!socket) return;
      await dynamicAxiosMethod({
        method: "post",
        shouldToken: true,
        endpoint: serverRoutes.post.createMessage,
        innerData: {
          sender: userPayload._id,
          receiver: userData?.data[userData.i]?._id,
          messageId: `${userPayload._id}${userData?.data[userData.i]?._id}`,
          Message: inputs.Message,
        },
      });
      clearInputs();
      roomInfo?.status === 200 &&
        socket.emit("send_message", {
          ...inputs,
          room: roomInfo?.data[0]?.roomId,
          sender: userPayload._id,
          receiver: userData?.data[userData.i]?._id,
          createdAt: new Date().toISOString(),
        });

      setTimeout(async () => {
        containerToScroll.current.scrollTo({
          top: containerToScroll.current.scrollHeight,
          behavior: "smooth",
        });
      }, 350);
    } catch (error) {
    }
  };

  var { data, inputs, clearInputs } = useGenerateInputs({
    justInput: true,
    array: ["Message"],
    titles: [""],
    eachContainer: `${centerItem()}`,
    anyAdditional: {
      html: (
        <IconComponent
          onClick={handleSend}
          classes={`w-[2vw] text-4xl ${textColors.PRIMARY} cursor-pointer`}
          Icon={iconsData["IoSend"]}
        />
      ),
      classes: "drop-shadow-[0_0_.3rem_gray]",
    },
  });

  return (
    <div className={`${bgColors.SECONDARY} w-full h-full`}>
      {typeof userData.i === "number" && data}
    </div>
  );
};

export default ScreenBottomPart;
