import React from "react";
import shopData from "../constants/shopData";
import IconComponent from "./IconComponent";
import { useSelector } from "react-redux";
import * as iconsData from "../constants/iconsData";
import { centerItem, coinsGemsColors, titleStyles } from "../utils/utils";

const CoinsGems = ({ classes, privateData, data, shouldExplain = true }) => {
  const { currentShopData } = useSelector((state) => state.shopReducer);
  return (
    <div className={`w-full h-full ${centerItem("justify-evenly")}`}>
      {shopData.topNav.icons.map((Icon, i) => {
        return (
          <div
            key={`shopDataCoinsGemsTopNav${i}`}
            className={`${coinsGemsColors(i === 0 ? true : false)} ${
              classes
                ? classes
                : `w-[40%] rounded-[40px] ${titleStyles("text-[1.3rem]")}`
            } h-[10vh] lg:h-full ${centerItem()} flex-col lg:flex-row flex-row-reverse gap-4 shadow-xl`}
          >
            <p className="text-[.8rem] lg:text-[1.3rem]">
              {shouldExplain && shopData.topNav.titles[i]}{" "}
              {privateData ||
                (data && data[i]) ||
                (currentShopData.bottomPart.coinsGems &&
                  currentShopData.bottomPart.coinsGems[i])}
            </p>
            <IconComponent Icon={iconsData[Icon]} />
          </div>
        );
      })}
    </div>
  );
};

export default CoinsGems;
