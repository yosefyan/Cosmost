import React from "react";
import defaultProfilePicture from "../assets/bgPages/aboutBG.jpg";
import {
  buttonStyles,
  centerItem,
  gradient,
  titleStyles,
} from "../utils/utils";
import { bgColors, gradientColors, textColors } from "../constants/colorsData";
import IconComponent from "./IconComponent";
import * as iconsData from "../constants/iconsData";
import { useSelector } from "react-redux";
import putCorrectDataForRank from "../helpers/putCorrectDataForRank";

const MyProfile = ({
  imgSize,
  classes,
  shouldButtons = true,
  handleProfileButtons,
}) => {
  const { userPayload } = useSelector((state) => state.authReducer);
  const handleImageError = (e) => (e.target.src = defaultProfilePicture);
  const profileData = {
    titles: ["My Data"],
    icons: ["FaUser"],
  };
  return (
    <div className={classes}>
      <>
        <img
          onError={handleImageError}
          className={`${
            !imgSize ? "w-[35%]" : imgSize
          } mt-2 opacity-70 shadow-2xl ${
            userPayload.isAdmin ? "shadow-red-500" : "shadow-cyan-500"
          } shadow-black rounded-[20px]`}
          src={userPayload.Profile_Picture || defaultProfilePicture}
          alt="profile picture"
        />
        <div
          className={`w-full h-[30%] bg-black/20 ${centerItem(
            "justify-evenly"
          )} gap-3 flex-col`}
        >
          <h1
            className={`${titleStyles("text-7xl")} h-[40%] tShadow ${gradient(
              true,
              gradientColors.SECONDARY
            )}`}
          >
            {userPayload?.Username || "Ghost"}
          </h1>
          <h3
            className={`w-1/2 ${centerItem()} ${
              putCorrectDataForRank(userPayload.Rank).color
            } gap-2 ${titleStyles("text-4xl")}`}
          >
            <IconComponent Icon={iconsData["FaUserFriends"]} />{" "}
            {userPayload?.Rank || "No Rank"}
          </h3>
          {userPayload.isAdmin && (
            <p className={`${textColors.DENY} text-2xl`}>Admin</p>
          )}
        </div>
        <div className={`text-white/60 w-full h-[10%] overflow-y-scroll`}>
          {userPayload.ownedStuff.titles.map((title, i) => (
            <div
              key={`userPayloadOnwedStuffTitles${i}`}
              className={`${centerItem()} text-4xl gap-4 bg-cyan-500/5 w-full h-full`}
            >
              <p className={`${gradient(true, gradientColors.PRIMARY)}`}>
                {title.topPart.Name}
              </p>
              <IconComponent
                Icon={
                  iconsData[userPayload.ownedStuff.titles[i].leftPart.imgSrc]
                }
              />
            </div>
          ))}
        </div>
        <div className={`w-full ${centerItem()} gap-4`}>
          {shouldButtons &&
            profileData.titles.map((title, i) => {
              return (
                <div
                  key={`profileDataTitles${i}`}
                  onClick={() => handleProfileButtons(i)}
                  className={`w-1/2 ${centerItem(
                    "justify-evenly"
                  )} ${buttonStyles(
                    "text-3xl"
                  )} shadow-lg shadow-white/50 w-[60%] rounded-[30px] ${
                    bgColors.SECONDARY
                  }`}
                >
                  <IconComponent
                    classes={`text-white opacity-30`}
                    Icon={iconsData[profileData.icons[i]]}
                  />
                  <button key={`profileDataButtons${i}`}>{title}</button>
                </div>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default MyProfile;
