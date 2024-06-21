import React from "react";
import { centerItem } from "../../../utils/utils";
import IconComponent from "../../../components/IconComponent";
import { bgColors, textColors } from "../../../constants/colorsData";
import * as iconsData from "../../../constants/iconsData";

const OuterGate = ({ feastsCategories, openDoor, handleOpenDoor }) => {
  const handleDoorChildren = () => handleOpenDoor();

  return (
    <>
      {feastsCategories.map((_, i) => {
        return (
          <div
            key={`feastsCategoriesOuterGate${i}`}
            style={
              openDoor
                ? {
                    transform: "translateY(50vh)",
                    transformOrigin: "top",
                  }
                : {}
            }
            onClick={() => i === 1 && handleDoorChildren()}
            className={`w-1/3 h-[80%] opacity-70 ${
              bgColors.SECONDARY
            } shadow-[0_-1rem_5rem_gray] transition-all slower rounded-[30px] ${centerItem(
              i === 1 && !openDoor ? "justify-start" : ""
            )} ${
              i === 0
                ? "skew-y-12"
                : i === 2
                ? "-skew-y-12"
                : `translate-y-[12%] cursor-pointer hover:border-8 border-white/50`
            }`}
          >
            <IconComponent
              classes={`opacity-70 ${
                i === 1
                  ? `text-gray-500 text-[15rem] tShadow animate-pulse inline-block`
                  : `${textColors.PRIMARY} text-[15rem]`
              }`}
              Icon={
                iconsData[i !== 1 ? "GiBorderedShield" : "RiDoorLockBoxLine"]
              }
            />
          </div>
        );
      })}
    </>
  );
};

export default OuterGate;
