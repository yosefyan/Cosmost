import React, { useState } from "react";
import { gradientColors, textColors } from "../../constants/colorsData";
import { centerItem, gradient, titleStyles } from "../../utils/utils";
import { useSelector } from "react-redux";
import Window from "./teleporterShards/Window";
import bgTeleporter from "../../assets/bgPages/tvBG.gif";
import IconComponent from "../../components/IconComponent";
import * as iconsData from "../../constants/iconsData";

const Teleporter = () => {
  let { data } = useSelector((state) => state.authReducer);
  const [currentData, setCurrentData] = useState({});

  const handleName = (name, i) => {
    setCurrentData({ name, i });
  };
  return (
    <div
      className={`w-[100vw] lg:h-[100vh] relative bg-black overflow-hidden ${centerItem(
        "justify-evenly"
      )} flex-col`}
    >
      <img
        className={`w-full h-full absolute opacity-20`}
        src={bgTeleporter}
        alt="stars BG"
      />
      <IconComponent
        classes={`text-[400vmin] text-purple-500/5 rotate-[90deg] absolute bottom-[0%] blur-lg`}
        Icon={iconsData["MdRocket"]}
      />
      <h1
        className={`${gradient(true, gradientColors.SECONDARY)} h-[30vh] lg:h-[10%] ${centerItem()} ${titleStyles(
          "text-4xl"
        )} upDown`}
      >
        Accelerating to the next adventure...
      </h1>
      <div className={`${centerItem()} flex-col lg:flex-row h-[10vh] ${titleStyles("text-3xl")}`}>
        <h3 className={`${textColors.SECONDARY}`}>Teleport me to</h3>
        <h5
          className={`p-4 ${titleStyles("text-5xl")} ${gradient(
            true,
            gradientColors.PRIMARY
          )}`}
        >
          {currentData.name || "?!?"}
        </h5>
      </div>
      <div className={`w-[70%] my-[8rem] lg:my-0 relative h-1/2 ${centerItem()} flex-col lg:flex-row gap-4`}>
        <Window handleName={handleName} role={"Home"} i={null} />
        {data.rolesData.map((role, i) => {
          return (
            <React.Fragment key={`mirrosTeleporterData${i}`}>
              <Window handleName={handleName} role={role} i={i} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Teleporter;
