import { rarityColors, textColors } from "../constants/colorsData";

const colorKey = (key, value) => {
  if (key === "Name") {
    return textColors.PRIMARY;
  } else if (key === "Type") {
    if (value === "Ranks") {
      return "text-orange-500/50";
    } else if (value === "Pets") {
      return "text-cyan-500/25";
    } else {
      return "text-blue-500/30";
    }
  } else if (key === "Rarity") {
    if (value === "LEGENDARY") {
      return rarityColors.LEGENDARY;
    } else if (value === "RARE") {
      return rarityColors.RARE;
    } else {
      return rarityColors.COMMON;
    }
  } else {
    return "";
  }
};

export default colorKey;
