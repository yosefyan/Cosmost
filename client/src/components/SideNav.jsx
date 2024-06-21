import React from "react";
import { centerItem, titleStyles } from "../utils/utils";
import { textColors } from "../constants/colorsData";
import IconComponent from "./IconComponent";
import * as iconsData from "../constants/iconsData";

const SideNav = ({ classes, data }) => {
  return (
    <div
      className={`w-full ${classes} ${textColors.PRIMARY} ${titleStyles(
        "text-3xl"
      )}  ${centerItem()}`}
    >
      {data.titles.map((title, i) => {
        return (
          <React.Fragment key={`dataTitlesSideNav${i}`}>
            <IconComponent
              title={title}
              classes={`${centerItem()} bg-black w-full`}
              Icon={iconsData[data.icons[i]]}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SideNav;
