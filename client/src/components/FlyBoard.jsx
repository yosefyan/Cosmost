import React, { useEffect, useState } from "react";
import { centerItem, titleStyles } from "../utils/utils";
import { bgColors, textColors } from "../constants/colorsData";
import * as iconsData from "../constants/iconsData";
import IconComponent from "./IconComponent";

const FlyBoard = ({ data }) => {
  let { PRIMARY, SECONDARY } = bgColors,
    { PRIMARY: textColorPrimary, SECONDARY: textColorSecondary } = textColors;

  const [fillData, setFillTime] = useState({
    fillTime: {},
    fillStatus: {},
  });

  useEffect(() => {
    let date = new Date();
    setFillTime({
      fillTime: Object.entries(data.inputs).map(([key, value]) =>
        value && data.inputs[key] === value
          ? `${date.getHours()} : ${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            }`
          : ""
      ),
      fillStatus: Object.values(data.inputs).map((value) =>
        value ? "ARRIVED" : "SOON"
      ),
    });
  }, [data.inputs]);

  return (
    <div className={`hidden lg:block drop-shadow-[0rem_0rem_2rem_purple] w-[90%] m-auto`}>
      <ul
        className={`w-full h-[10vh] p-4 pb-0 ${centerItem("justify-around")}`}
      >
        {data.titles.map((title, i) => {
          return (
            <React.Fragment key={`flyingBoardTitles${i}`}>
              <li
                className={`lg:w-full lg:h-full ${centerItem(
                  "justify-evenly"
                )} ${titleStyles("text-[1.2rem]")} ${
                  i % 2 === 0
                    ? `${textColorSecondary} ${PRIMARY}`
                    : `${textColorPrimary} ${SECONDARY}`
                }`}
              >
                <IconComponent Icon={iconsData[data.Icons[i]]} />
                {title}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <div className="w-full h-[50vh] px-4 grid grid-rows-4">
        {Object.entries(data.inputs).map(([key, value], i) => {
          const cubesData = [
            fillData.fillTime[i],
            key,
            value,
            fillData.fillStatus[i],
          ];
          return (
            <ul
              key={`genericDataInputs${i}`}
              className={`${centerItem(
                "justify-evenly"
              )} list-none ${titleStyles("text-[1rem]")}`}
            >
              {cubesData.map((cube, index) => {
                return (
                  <li
                    key={`cubesDataFlyBoard${index}`}
                    style={{ lineBreak: index === 1 ? "initial" : "anywhere" }}
                    className={`border-2 ${
                      index !== 0 && cube && cube.length > 5
                        ? "text-[.8rem]"
                        : ""
                    } border-black overflow-y-auto ${
                      index === cubesData.length - 1
                        ? fillData.fillStatus[i] === "ARRIVED"
                          ? textColors.ACCEPT
                          : textColors.DENY
                        : ""
                    } ${centerItem()} lg:p-4 w-full max-w-[25%] h-full ${
                      i % 2 === 0
                        ? `${textColorSecondary} ${PRIMARY}`
                        : `${textColorPrimary} ${SECONDARY}`
                    }`}
                  >
                    {index === 1 ? cube.replace(/_/g, " ") : cube || "???"}
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default FlyBoard;
