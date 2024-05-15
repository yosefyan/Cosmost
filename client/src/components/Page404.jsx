import React from "react";
import { centerItem, titleStyles } from "../utils/utils";
import { textColors } from "../constants/colorsData";
import * as iconsData from "../constants/iconsData";
import IconComponent from "./IconComponent";

const Page404 = () => {
  return (
    <div
      className={`${centerItem()} w-full h-full p-4 animate-pulse flex-col`}
    >
      <h1 className={`${titleStyles("text-2xl")} text-white/50`}>
        You've found a{" "}
        <span className={`${textColors.DENY} tShadow `}>black hole</span>
      </h1>
      <div className={`${centerItem()}  w-full p-6 flex-col`}>
        <h3
          className={`${textColors.PRIMARY} w-full ${titleStyles(
            "text-[2rem]"
          )}`}
        >
          Any final
        </h3>
        <IconComponent
          classes={`text-[9rem] ${textColors.DENY} animate-ping slowe`}
          Icon={iconsData["TbError404"]}
        />
        <h1
          className={`${titleStyles("text-[1.4rem]")} tShadow ${
            textColors.SECONDARY
          } w-full`}
        >
          wishes?
        </h1>
      </div>
    </div>
  );
};

export default Page404;
