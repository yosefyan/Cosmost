import React from "react";
import { centerItem, gradient, titleStyles } from "../utils/utils";
import { gradientColors, textColors } from "../constants/colorsData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDynamicDispatch from "../hooks/useDynamicDispatch";
import Loading from "../pages/Loading/Loading";

const PortalNav = ({ widthHeight }) => {
  const { toggleNav } = useSelector((state) => state.globalReducer);
  const navigate = useNavigate();

  const dynamicDispatch = useDynamicDispatch();
  const handleNav = () => {
    dynamicDispatch("TOGGLE_NAV", { toggleNav: true });

    setTimeout(() => {
      navigate("/teleporter");
      dynamicDispatch("TOGGLE_NAV", { toggleNav: false });
    }, 2500);
  };

  return (
    <div
      style={{ zIndex: 9999999 }}
      className={`${
        widthHeight || `w-1/2 h-[30vh] lg:w-[10vw] lg:h-full opacity-70`
      } relative p-4 ${centerItem()} flex-col gap-4`}
    >
      {toggleNav && <Loading />}
      <p className={`${titleStyles("text-5xl")} ${textColors.PRIMARY}`}>EXIT</p>
      <div
        onClick={handleNav}
        className={`w-[80%] brightness-150 callAnimation drop-shadow-[0_0_35px_gray] cursor-pointer h-[80%] blur-md border-black border-8 rounded-full transition-all ${gradient(
          false,
          gradientColors.SECONDARY
        )}`}
      ></div>
    </div>
  );
};

export default PortalNav;
