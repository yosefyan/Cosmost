import React from "react";
import { centerItem, gradient, titleStyles } from "../utils/utils";
import areYouSureData from "../constants/areYouSureData";
import IconComponent from "./IconComponent";
import { gradientColors } from "../constants/colorsData";
import { useSelector } from "react-redux";
import * as iconsData from "../constants/iconsData";
import useDynamicDispatch from "../hooks/useDynamicDispatch";

const AreYouSure = ({ shouldAddDialog, handleStatus, classes }) => {
  const { dialogData } = useSelector((state) => state.globalReducer);
  const dynamicDispatch = useDynamicDispatch();
  const handleSureButtons = (i) => {
    handleStatus(i);
    dynamicDispatch("CLOSE_DIALOG", {
      ...(i === 0 ? { dialogType: "areYouSure" } : { dialogType: "CLOSE_ALL" }),
    });
  };
  return (
    <div
      style={{ zIndex: 999999999999 }}
      className={`${
        shouldAddDialog?.shouldOpen ||
        (dialogData.dialogType === "areYouSure" && dialogData.toggleDialog)
          ? "scale-1"
          : "scale-0"
      } rounded-2xl absolute shadow transition-all shadow-black ${
        classes
          ? classes
          : `w-[80vw] lg:w-[60vw] h-[50vh] ${centerItem("justify-evenly")}`
      } flex-col ${gradient(false, gradientColors.PRIMARY)}`}
    >
      <h1
        className={`text-center ${centerItem()} tShadow bg-black/25 p-4 w-full h-[20%] lg:h-[60%] text-white/50 ${titleStyles(
          "text-4xl lg:text-8xl"
        )}`}
      >
        Are you sure?
      </h1>
      <div className={`w-full h-[80%] lg:h-[30%] ${centerItem("justify-evenly")} flex-col lg:flex-row`}>
        {areYouSureData.icons.map((Icon, i) => {
          return (
            <div
              onClick={() => handleSureButtons(i)}
              className={`${centerItem()} cursor-pointer hover:scale-95 transition-all w-[80%] lg:w-[40%] shadow-2xl shadow-black ${titleStyles()} p-4 rounded-2xl text-white gap-4 h-[20%] lg:h-[80%] ${
                i === 0 ? "bg-red-500/50" : "bg-green-500/50"
              }`}
              key={`areYouSureButtons${i}`}
            >
              <IconComponent Icon={iconsData[Icon]} />
              <a className="text-white/50">{areYouSureData.buttons[i]}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreYouSure;
