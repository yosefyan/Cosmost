import React from "react";
import Road from "./Road";
import bgUtilsData from "../constants/bgUtilsData.js";

const Basement = () => {
  const { roadAlign, roadColor, fixUnit, units, positions } =
    bgUtilsData.roadData;
  return (
    <>
      {Object.values(positions).map((value, i) => {
        let Unit = units[i];
        return (
          <Road
            index={i}
            fixRotate={fixUnit[i]}
            colors={roadColor}
            deg={i === 0 ? roadAlign.horizontalLeft : roadAlign.horizontalRight}
            Unit={Unit}
            position={value}
            key={i}
          />
        );
      })}
    </>
  );
};

export default Basement;
