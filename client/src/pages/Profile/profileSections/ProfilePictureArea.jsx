import React from "react";
import MyProfile from "../../../components/MyProfile";
import { centerItem, triangleStyles } from "../../../utils/utils";

const ProfilePictureArea = () => {
  const profilePictureData = {
    lasers: Array(2).fill(""),
  };
  return (
    <div className={`w-full lg:w-1/2 h-[100vh] lg:h-full relative ${centerItem()}`}>
      <MyProfile
        imgSize={"w-[60%]"}
        classes={`w-[80%] h-[100vh] lg:h-[80%] rotateSpace transition-all border-dotted border-x-[5rem] border-sky-500/20 border-l-fuchsia-500/20 rounded-[45%] ${centerItem()} flex-col`}
        shouldButtons={false}
      />
      {profilePictureData.lasers.map((_, i) => {
        return (
          <div
            key={`profilePictureDataLaser${i}`}
            className={`${
              i === 0
                ? "left-[5rem] lg:left-[15rem] sideLeft border-t-sky-500/20"
                : "left-[5rem] lg:left-[25rem] sideRight"
            } absolute border-8 border-x-[11rem] h-1 top-[15%] blur-[3rem] drop-shadow-[0_0rem_2rem_#aaf] ${triangleStyles(
              false,
              `border-t-[50rem]`
            )}`}
          ></div>
        );
      })}
    </div>
  );
};

export default ProfilePictureArea;
