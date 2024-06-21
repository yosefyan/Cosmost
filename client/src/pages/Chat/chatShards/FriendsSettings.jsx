import React from "react";
import messagesData from "../../../constants/messagesData";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import upDownIndex from "../../../helpers/upDownIndex";

const FriendsSettings = ({ whichToShow, handleIcons }) => {
  const handleIconsInteraction = (i) => {
    handleIcons(i);
  };

  return (
    <div className={`h-[40%] relative`}>
      <div className={`h-1/2 ${centerItem()}`}>
        {messagesData.topIcons.titles.map((title, i) => {
          return (
            <h1
              key={`messagesDataTopIconsTitlesFriendRequests${i}`}
              className={`absolute transition-all ${
                whichToShow !== i
                  ? "translate-y-[15rem] scale-0"
                  : "translate-y-0 scale-1"
              } ${centerItem()} fly ${titleStyles("text-5xl")} ${gradient(
                true,
                gradientColors.PRIMARY
              )} tShadow tracking-[.5rem]`}
            >
              {title}
            </h1>
          );
        })}
      </div>
      <div className={`w-full h-1/2 ${centerItem("justify-evenly")}`}>
        {messagesData.topIcons.icons.map((icon, i) => {
          return (
            <React.Fragment key={`messagesDataTopIconsIconsFriendRequests${i}`}>
              <IconComponent
                onClick={() => handleIconsInteraction(i)}
                classes={`p-8 w-1/2 ${
                  whichToShow === i ? bgColors.PRIMARY : ""
                } ${centerItem()} text-6xl ${upDownIndex(
                  i
                )}  hover:bg-gray-500/25 cursor-pointer hover:scale-95 rounded-[20px] ${
                  i % 2 === 0 ? textColors.PRIMARY : textColors.SECONDARY
                }`}
                Icon={iconsData[icon]}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsSettings;
