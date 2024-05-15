import React from "react";
import { centerItem, gradient } from "../utils/utils";
import { gradientColors } from "../constants/colorsData";

const MessageFormat = ({ children, classes }) => {
  return (
    <div
      className={`${classes} rounded-[20px] ${centerItem()} ${gradient(
        false,
        gradientColors.PRIMARY
      )}`}>
      {children}
    </div>
  );
};

export default MessageFormat;
