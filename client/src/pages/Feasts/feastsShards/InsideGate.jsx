import React, { memo } from "react";
import { centerItem, gradient, grid, titleStyles } from "../../../utils/utils";
import IconComponent from "../../../components/IconComponent";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import * as iconsData from "../../../constants/iconsData";
import MuseumGlass from "../../Shop/shopSections/MuseumGlass";
import shopData from "../../../constants/shopData";
import upDownIndex from "../../../helpers/upDownIndex";
import colorKey from "../../../helpers/colorKey";
import normalizeData from "../../../utils/normalizeData";

const InsideGate = ({
  feastsCategories,
  openDoor,
  userPayload,
  currentDisplay,
}) => {
  const reversedArray = [...shopData.sideNav.icons].reverse();
  return (
    <div
      className={`w-full h-[80%] absolute transition-all ${
        !openDoor ? "translate-y-[100vh]" : ""
      }  ${centerItem("", "items-start")} flex-col lg:flex-row`}
    >
      {feastsCategories.map((_, i) => {
        return (
          <div
            className={`w-full lg:w-1/3 h-[100vh] lg:h-[70%] relative ${centerItem()}`}
          >
            {i === 1 ? (
              <>
                <IconComponent
                  classes={`absolute text-[80vmin] fly blur-[.2rem] z-20 hover:text-red-500/15 transition-all rotateSpace drop-shadow-[0_0_1rem_white] ${textColors.ACCEPT}`}
                  Icon={iconsData["GiAngelWings"]}
                />
                <MuseumGlass data={reversedArray[currentDisplay]} />
              </>
            ) : i === 0 ? (
              <div
                className={`w-[90%] lg:w-[70%] h-full ${centerItem(
                  "justify-evenly"
                )} flex-col`}
              >
                <h1
                  className={`${titleStyles("text-4xl")} fly tShadow ${gradient(
                    true,
                    gradientColors.PRIMARY
                  )}`}
                >
                  Now showing
                </h1>
                {Object.keys(userPayload.ownedStuff).map((key, i) => (
                  <p
                    className={`w-[80%] h-[20%] ${
                      i === currentDisplay ? "shadow-[0_0_1rem_white]" : ""
                    } cursor-pointer hover:scale-95 transition-all p-8 lg:-p-0 text-gray-500 tShadow ${
                      bgColors[i % 2 === 0 ? "PRIMARY" : "SECONDARY"]
                    } rounded-[20px] ${titleStyles(
                      "text-2xl lg:text-4xl"
                    )} ${centerItem()}`}
                  >
                    {key.toUpperCase()}
                  </p>
                ))}
              </div>
            ) : (
              <div
                className={`w-full h-[100vh] lg:h-full rotate animate-pulse absolute bottom-0 lg:relative p-4 ${grid(
                  "justify-items-center"
                )} grid-cols-4`}
              >
                {userPayload.ownedStuff[
                  shopData.sideNav.titles[currentDisplay].toLowerCase()
                ].map((categ, i) => {
                  return (
                    <IconComponent
                      classes={`${colorKey(
                        "Rarity",
                        categ.topPart.Rarity
                      )} text-5xl h-1/2 p-8 ${upDownIndex(i)}`}
                      Icon={iconsData[categ.leftPart.imgSrc]}
                    />
                  );
                })}
                <div
                  className={`w-[70%] absolute -z-20 h-[80%] bg-cyan-500/20 blur-[4rem]`}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(InsideGate);
