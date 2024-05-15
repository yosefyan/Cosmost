import React from "react";
import feedData from "../../../constants/feedData";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import { buttonStyles, centerItem } from "../../../utils/utils";
import { bgColors } from "../../../constants/colorsData";
import upDownIndex from "../../../helpers/upDownIndex";

const UserTopIcons = ({ handleProfileButtons }) => {
  return (
    <div className={`w-[80%] h-[20%] hidden lg:flex ${centerItem()} gap-4 `}>
      {feedData.userButtons.map((icon, i) => {
        return (
          <React.Fragment key={`userButtonsFeed${i}`}>
            <IconComponent
              onClick={() => handleProfileButtons(i)}
              classes={`${buttonStyles("")} ${upDownIndex(
                i
              )} ${centerItem()} shadow-lg shadow-fuchsia-500/50 rounded-[20px] tShadow w-[20%] ${
                bgColors.PRIMARY
              }`}
              Icon={iconsData[icon]}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default UserTopIcons;
