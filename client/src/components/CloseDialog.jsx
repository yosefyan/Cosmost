import React from "react";
import { textColors } from "../constants/colorsData";
import { titleStyles } from "../utils/utils";
import useDynamicDispatch from "../hooks/useDynamicDispatch";

const CloseDialog = ({ handleSpecificClose }) => {
  const dynamicDispatch = useDynamicDispatch();

  return (
    <div
      onClick={() => {
        handleSpecificClose();
        dynamicDispatch("CLOSE_DIALOG");
      }}
      className={`${textColors.SECONDARY} ${titleStyles(
        "text-4xl"
      )} mr-4 p-4 cursor-pointer hover:bg-gray-500/20 w-1/2 transition-all rounded-full`}
    >
      X
    </div>
  );
};

export default CloseDialog;
