import React from "react";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import { useSelector } from "react-redux";
import CoinsGems from "../../../components/CoinsGems";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import CloseDialog from "../../../components/CloseDialog";
import colorKey from "../../../helpers/colorKey";

const SideShopDialogInfo = ({ handleStatus }) => {
  const { currentShopData } = useSelector((state) => state.shopReducer);

  return (
    <div className="infoPriceArea w-full h-[90%]">
      <div className={`${centerItem("justify-center lg:justify-between")}`}>
        <h1
          className={`${titleStyles(
            "text-4xl"
          )} drop-shadow-[0_0_.4rem_black] shadow-black ${gradient(
            true,
            gradientColors.PRIMARY
          )} decoration-8`}>
          Details
        </h1>
        <CloseDialog handleSpecificClose={() => null} />
      </div>
      <div
        className={`w-full lg:w-[95%] h-[80%] bg-black/50 rounded-t-[20px] ${centerItem(
          "justify-evenly"
        )} flex-col`}>
        {Object.entries(currentShopData.topPart).map(([key, value], i) => {
          return (
            <div
              key={`shopDataShopDialogDetails${i}`}
              className={`w-[90%] p-8 rotateSpace ${
                i % 2 === 0
                  ? `${bgColors.PRIMARY} ${textColors.SECONDARY}`
                  : `${bgColors.SECONDARY} ${textColors.PRIMARY}`
              } hover:scale-95 rounded-[25px] transition-all ${titleStyles(
                "text-2xl"
              )} ${centerItem("justify-between")}`}>
              <h1
                className={`${titleStyles(
                  "text-3xl"
                )} drop-shadow-[0_0_.5rem_black]`}>
                {key}
              </h1>
              <h1
                className={`drop-shadow-[0_0_.5rem_#aaa]
                 ${colorKey(key, value)} ${
                  value === "LEGENDARY"
                    ? "drop-shadow-xl drop-shadow-white"
                    : ""
                }`}>
                {value}
              </h1>
            </div>
          );
        })}
      </div>
      <div className={`w-[95%] h-[10%] bg-black/70 ${centerItem()}`}>
        <CoinsGems
          privateData={false}
          classes={`w-full text-2xl ${titleStyles("text-[1.3rem]")}`}
        />
        <button
          onClick={handleStatus}
          className={`w-[40%] h-full text-[.8rem] lg:text-2xl ${centerItem("justify-evenly")} flex-col lg:flex-row ${
            bgColors.SECONDARY
          } ${textColors.PRIMARY}`}>
          <IconComponent Icon={iconsData['FaCartPlus']} />
          ADD
        </button>
      </div>
    </div>
  );
};

export default SideShopDialogInfo;
