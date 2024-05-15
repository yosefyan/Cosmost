import * as iconsData from "../constants/iconsData";

const matchToEachIcon = (str, forStar, forCosmic, forUniversal) =>
  str === "Star"
    ? forStar
    : str === "Cosmic"
    ? forCosmic
    : str === "Universal" && forUniversal;

const putCorrectDataForRank = (iconString) => ({
  icon: iconsData[
    matchToEachIcon(iconString, "FaStar", "GiCosmicEgg", "TbUniverse")
  ],
  color: matchToEachIcon(
    iconString,
    "text-yellow-500/50",
    "text-purple-500/50",
    "text-sky-500"
  ),
  borderBottom: matchToEachIcon(
    iconString,
    "border-b-yellow-500/50",
    "border-b-purple-500/50",
    "border-b-sky-500"
  ),
});

export default putCorrectDataForRank;
