import React, { memo, useState } from "react";
import { centerItem, titleStyles } from "../utils/utils";
import putCorrectDataForRank from "../helpers/putCorrectDataForRank";
import IconComponent from "./IconComponent";
import { useSelector } from "react-redux";
import inputsData from "../constants/inputsData";
import * as iconsData from "../constants/iconsData";
import { bgColors, textColors } from "../constants/colorsData";
import useDynamicDispatch from "../hooks/useDynamicDispatch";
import isMobileDevice from "../helpers/isMobile";

const ProfileNameTitle = ({
  data,
  endpoint,
  neededIndex,
  rightSideData,
  index,
  normalize,
}) => {
  const { userPayload } = useSelector((state) => ({
    userPayload: state.authReducer.userPayload,
  }));
  const dynamicDispatch = useDynamicDispatch();
  const handleTopIcons = async (i) => {
    isMobileDevice();
    dynamicDispatch("OPEN_DIALOG", {
      toggleDialog: true,
      dialogType:
        i === 1
          ? "areYouSure"
          : neededIndex === 0
          ? "editPost"
          : normalize === "editComment"
          ? "editComment"
          : normalize === "EditUsername"
          ? "editUser"
          : "editPoll",
      data,
      neededIndex,
      shouldSendServer: true,
    });
    data &&
      dynamicDispatch("SET_AXIOS_DATA", {
        method: i === 0 ? "patch" : "delete",
        innerData: data,
        normalize,
        endpoint: i === 0 ? endpoint.patch : endpoint.delete,

        toastifyMessage: `Succesfully ${i === 0 ? "updated" : "removed"}.`,
      });
  };
  return (
    <>
      <div
        className={`w-full relative ${
          index
            ? index % 2 === 0
              ? bgColors.PRIMARY
              : bgColors.SECONDARY
            : bgColors.PRIMARY
        } ${centerItem("justify-start")} p-4`}
      >
        <img
          className="w-[15%] eyesClosingOpening transition-all shadow-[0_0_1rem_gray] h-[5rem] rounded-full"
          src={data.userData.Profile_Picture}
          alt={data.userData.Alt}
        />
        <div className={`m-4 pl-4`}>
          <h1
            className={`tShadow p-1 ${
              index !== undefined ? "text-white/50" : ""
            } ${titleStyles("text-2xl")}`}
          >
            {data.userData.Username}
          </h1>
          <h3
            className={`${
              putCorrectDataForRank(data.userData.Rank).color
            } tShadow ${titleStyles("text-[.7rem]")} gap-2 ${centerItem()}`}
          >
            <IconComponent
              classes={`text-3xl`}
              Icon={putCorrectDataForRank(data.userData.Rank).icon}
            />{" "}
            {data.userData.Rank}
          </h3>
        </div>
        {rightSideData || (
          <div className={`flex-1 ${centerItem("justify-end")}`}>
            {(userPayload._id === data.user_id || userPayload.isAdmin) &&
              inputsData.profileIcons.map((icon, i) => {
                return (
                  <IconComponent
                    onClick={() => handleTopIcons(i)}
                    classes={`${
                      i === 0 ? textColors.PRIMARY : textColors.DENY
                    } mr-4 p-3 cursor-pointer hover:bg-gray-500/10 rounded-full text-2xl`}
                    Icon={iconsData[icon]}
                  />
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(ProfileNameTitle);
