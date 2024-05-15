import React, { memo, useState } from "react";
import MilkyWayIcon from "../../../components/MilkyWayIcon";
import milkyWayData from "../../../constants/milkyWayData";
import { centerItem, gradient, iconStyles } from "../../../utils/utils";
import { useSelector } from "react-redux";
import { MdOutlineQuestionMark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import * as iconsData from "../../../constants/iconsData";
import useIsMobile from "../../../hooks/useIsMobile";

const MilkyWay = () => {
  const { data } = useSelector((state) => state.authReducer);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [shouldIncrease, setShouldIncrease] = useState(false);
  return (
    <div
      className={`${centerItem()} ${
        shouldIncrease ? "scaleAnimation" : ""
      } text-white w-[80%] transition-all`}
    >
      <div
        style={{ scale: `${isMobile ? ".4" : ".7"}` }}
        className={`animate-spin slower opacity-20 drop-shadow-[0_0_5rem_#ffffff36] ${centerItem()} flex-col`}
      >
        <div className={`${centerItem()} absolute w-full h-full blur-md`}>
          {milkyWayData.bgCircles.map((_, i) => {
            return (
              <div
                style={{
                  width: `${(i + 1) * 350}px`,
                  height: `${(i + 1) * 350}px`,
                }}
                className="absolute animate-spin slowe border-fuchsia-500/70 blur-[1.5rem] border-double p-[4rem] border-t-[3rem] drop-shadow-[0_0_5rem_cyan] rounded-full"
                key={`milkyWayCircles${i}`}
              ></div>
            );
          })}
        </div>
        {milkyWayData.positions.textPositions.map((pos, i) => {
          let Icon = iconsData[data.iconsData[i]] || MdOutlineQuestionMark;
          return (
            <div key={`milkyWayData${i}`} className="z-20">
              <h1
                className={`absolute rotateBackwards slower ${pos} ${centerItem(
                  "flex-row-reverse"
                )} flex-col-reverse gap-4`}
              >
                <span
                  className={`text-[3rem] ${gradient(
                    true,
                    !data.rolesData[i]
                      ? ["from-gray-500", "to-gray-500"].join(" ")
                      : i > 2
                      ? ["from-blue-500", "to-fuchsia-500"].join(" ")
                      : ["from-fuchsia-500", "to-blue-500"].join(" ")
                  )}`}
                >
                  {data.rolesData[i] || "Undiscovered"}
                </span>
                <i className={`${iconStyles("text-6xl")} cursor-default`}>
                  <Icon
                    className={`${
                      !data.rolesData[i]
                        ? "fill-gray-500"
                        : i > 2
                        ? "fill-fuchsia-500"
                        : "fill-cyan-500"
                    }`}
                  />
                </i>
              </h1>
              <span
                onClick={() => {
                  setShouldIncrease(true);
                  setTimeout(() => {
                    navigate(`/${data.rolesData[i].toLowerCase()}`);
                  }, 1500);
                }}
                className={`absolute ${
                  i > 2 ? "bg-fuchsia-700/60" : "bg-blue-500/50"
                } ${
                  milkyWayData.positions.dotPositions[i]
                } drop-shadow-[0_0_.5rem_white] brightness-75 w-[6rem] h-[6rem] callAnimation slow rounded-full outline-double outline-3 hover:up outline-offset-2 cursor-pointer transition-all`}
              ></span>
            </div>
          );
        })}

        <MilkyWayIcon />
      </div>
    </div>
  );
};

export default memo(MilkyWay);
