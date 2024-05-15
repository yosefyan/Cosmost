import * as iconsData from "../constants/iconsData.js";

const bgUtilsData = {
  roadData: {
    positions: {
      firstRoad: "left-[47.5vw] bottom-[0vh]",
    },
    roadAlign: {
      straight: "rotate-[90deg]",
      straightBackwards: "rotate-[0deg]",
      horizontalLeft: "rotate-[-180deg]",
      horizontalRight: "rotate-[-135deg]",
    },
    fixUnit: [
      "rotate-[90deg]",
      "rotate-[90deg]",
      "rotate-[90deg]",
      "rotate-[90deg]",
    ],
    roadColor: "bg-black/85",
    units: Array(4).fill(iconsData["FaShuttleSpace"]),
  },
};

export default bgUtilsData;
