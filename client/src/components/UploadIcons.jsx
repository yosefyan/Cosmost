import React from "react";
import IconComponenet from "./IconComponent";
import { centerItem, titleStyles } from "../utils/utils";
import { textColors } from "../constants/colorsData";

const UploadIcons = ({
  Icon,
  classes,
  title,
  onClick,
  onMouseOver,
  onMouseLeave,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-black/75 background-primary even:background-secondary h-full cursor-pointer ${classes} ${centerItem()} hover:bg-white/10`}>
      {Icon && (
        <IconComponenet
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          classes={`cursor-pointer w-full ${centerItem()} transition-all 
        `}
          Icon={Icon}
        />
      )}
      {title && (
        <p
          className={`w-full ${centerItem()} ${
            textColors.SECONDARY
          } ${titleStyles("text-3xl")}`}>
          {title}
        </p>
      )}
    </div>
  );
};

export default UploadIcons;
