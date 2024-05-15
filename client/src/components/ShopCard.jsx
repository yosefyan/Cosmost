import React from "react";
import IconComponent from "./IconComponent";
import { centerItem, coinsGemsColors, titleStyles } from "../utils/utils";
import { textColors } from "../constants/colorsData";
import shopData from "../constants/shopData";
import upDownIndex from "../helpers/upDownIndex";
import * as iconsData from "../constants/iconsData";
import useDynamicDispatch from "../hooks/useDynamicDispatch";
import isMobileDevice from "../helpers/isMobile";

const ShopCard = ({ data, current }) => {
  const dynamicDispatch = useDynamicDispatch();
  return (
    <div
      className={`grid text-white p-8 grid-cols-2 lg:grid-cols-3 gap-[6rem] w-full ${centerItem()}`}
    >
      {data.titles.map((da, i) => {
        const { Coins, Gems, Rarity } = data.prices[i];
        return (
          <div
            onClick={() => {
              isMobileDevice()
              dynamicDispatch("SET_DATA", {
                currentShopData: {
                  leftPart: {
                    imgSrc: data.icons[i],
                  },
                  topPart: {
                    Name: da,
                    Type: shopData.sideNav.titles[current],
                    Rarity,
                  },
                  bottomPart: { coinsGems: [Coins, Gems] },
                },
              });
              dynamicDispatch("OPEN_DIALOG", { dialogType: "cardInfoDialog" });
            }}
            key={`ShopCard${i}`}
            className={`${centerItem()} cursor-pointer transition-all w-full h-fit shadow-xl rounded-[25px] brightness-50 flex-col overflow-hidden ${upDownIndex(
              i
            )} hover:shadow-lg hover:shadow-gray-500 `}
          >
            <div
              className={`w-full h-full bg-red-500/15 transition-all ${centerItem()} flex-col`}
            >
              <IconComponent
                classes={`w-full ${centerItem()} py-8 ${
                  shopData.rarityData.common.includes(da)
                    ? "bg-gray-500/50"
                    : shopData.rarityData.rare.includes(da)
                    ? "bg-green-500/50"
                    : "bg-yellow-500/50"
                } ${titleStyles("text-8xl")}`}
                Icon={iconsData[data.icons[i]]}
              />
              <h1
                className={`w-full p-4 bg-black/30 ${
                  current === 0
                    ? "bg-orange-500/20"
                    : current === 1
                    ? "bg-cyan-500/25"
                    : "bg-blue-500/30"
                } ${titleStyles(da.length > 4 ? "text-2xl" : "text-4xl")} ${
                  i % 2 === 0 ? textColors.PRIMARY : textColors.SECONDARY
                }`}
              >
                {da}
              </h1>
              <h1
                className={`w-full p-4  ${titleStyles(
                  da.length > 4 ? "text-[1.2rem]" : "text-[1rem]"
                )} ${
                  shopData.rarityData.common.includes(da)
                    ? "text-gray-500"
                    : shopData.rarityData.rare.includes(da)
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {Rarity}
              </h1>
            </div>
            <div
              className={`w-full h-full py-8 ${centerItem("justify-evenly")}`}
            >
              <div
                className={`${centerItem(
                  "justify-evenly"
                )} rounded-[20px] h-[70%] flex-col p-4 ${coinsGemsColors(
                  true
                )}`}
              >
                <IconComponent
                  classes={`${titleStyles("text-5xl")}`}
                  Icon={iconsData[shopData.topNav.icons[0]]}
                />
                <h3 className={`${titleStyles("text-2xl")}`}>{Coins}</h3>
              </div>
              <div
                className={`${centerItem(
                  "justify-evenly"
                )} rounded-[20px] h-[70%] flex-col p-4 ${coinsGemsColors(
                  false
                )}`}
              >
                <IconComponent
                  classes={`${titleStyles("text-5xl")}`}
                  Icon={iconsData[shopData.topNav.icons[1]]}
                />
                <h3 className={`${titleStyles("text-2xl")}`}>{Gems}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShopCard;
