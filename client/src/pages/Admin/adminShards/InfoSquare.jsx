import React from "react";
import { bgColors } from "../../../constants/colorsData";
import { centerItem, titleStyles } from "../../../utils/utils";
import PieChart from "./PieChart";

const InfoSquare = ({ data, serverData }) => {
  return (
    <div className={`w-full h-1/2 relative animate-pulse`}>
      <div
        style={{ zIndex: 0 }}
        className={`w-full h-full absolute top-0 ${bgColors.SECONDARY} blur-lg`}
      ></div>
      <h1
        className={`${titleStyles(
          "text-4xl"
        )} h-[20%] ${centerItem()} flex-col tShadow`}
      >
        <span className="text-white/50">Total</span>
        {data.shouldSplit ? (
          <div className={`w-full p-4`}>
            <span className={`${data.firstColor.tailwind}`}>
              {data.title.split("-")[0]} |
            </span>{" "}
            <span className={`${data.secondColor.tailwind}`}>
              {data.title.split("-")[1]} |
            </span>
          </div>
        ) : (
          data.title
        )}
      </h1>
      <div className={`w-full h-[80%] z-20 relative ${centerItem()}`}>
        <PieChart
          squareData={data}
          serverData={serverData}
          whatToShow={data.whatToShow}
        />
      </div>
    </div>
  );
};

export default InfoSquare;
