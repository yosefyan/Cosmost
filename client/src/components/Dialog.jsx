import React from "react";
import { useSelector } from "react-redux";
import useIsMobile from "../hooks/useIsMobile";

const Dialog = ({ children, classes, specificToggle }) => {
  const isMobile = useIsMobile();
  const { toggleDialog, dialogType } = useSelector(
    (state) => state.globalReducer.dialogData
  );
  const logic =
    dialogType === "CLOSE_ALL"
      ? false
      : (toggleDialog && specificToggle) ||
        (!toggleDialog && specificToggle && true);

  return (
    <div
      style={{ zIndex: 99999999 }}
      className={`absolute ${logic ? "scale-1" : "scale-0"} ${
        isMobile ? "top-0" : ""
      } h-[100vh] transition-all bg-black/95 ${classes}`}
    >
      {children}
    </div>
  );
};

export default Dialog;
