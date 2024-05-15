import React from "react";
import * as iconsData from "../../../constants/iconsData";
import feedData from "../../../constants/feedData";
import { buttonStyles, centerItem, gradient, titleStyles } from "../../../utils/utils";
import { bgColors, gradientColors } from "../../../constants/colorsData";
import TitleIcon from "../../../components/TitleIcon";
import upDownIndex from "../../../helpers/upDownIndex";

const WhichPosts = () => {
  return (
    <div
      className={`w-full ${gradient(false, gradientColors.TERTIARY)} h-[40%] ${centerItem(
        "justify-evenly"
      )} flex-col gap-4`}
    >
      <h1
        className={`${titleStyles("text-4xl")} ${gradient(
          true,
          gradientColors.PRIMARY
        )}`}
      >
        Show posts of
      </h1>
      <div
        className={`${centerItem("justify-between")} gap-4 w-[85%] m-auto my-0`}
      >
        {feedData.whichPosts.top.icons.map((icon, i) => {
          return (
            <TitleIcon
              key={`whichPostsFeed${i}`}
              classes={`${centerItem()} ${upDownIndex(
                i
              )} w-[40%] rounded-[20px] ${buttonStyles("text-2xl")} ${
                bgColors.PRIMARY
              } flex-col`}
              title={feedData.whichPosts.top.titles[i]}
              icon={iconsData[icon]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WhichPosts;
