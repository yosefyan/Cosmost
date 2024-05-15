import React, { useState, useEffect, memo } from "react";
import { textColors } from "../constants/colorsData";
import * as iconsData from "../constants/iconsData";
import IconComponent from "./IconComponent";

const Eye = ({ neededInput }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className={`relative w-[8vmin] h-[10vh] border-4 border-purple-500/25 border-dotted overflow-hidden rounded-full `}
    >
      <IconComponent
        style={{ left: `${position.x / 40}px`, top: `${position.y / 15}px` }}
        classes={`absolute blur-[.1rem] w-[40%] h-[40%] ${
          textColors.PRIMARY
        } transition-all  ${neededInput ? "scale-[1]" : "scale-[2]"}`}
        Icon={iconsData["FaStar"]}
      />
    </div>
  );
};

export default memo(Eye);
