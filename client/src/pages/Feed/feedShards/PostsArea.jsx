import React, { useEffect, useState } from "react";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import * as iconsData from "../../../constants/iconsData";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import feedData from "../../../constants/feedData";
import IconComponent from "../../../components/IconComponent";
import * as IconsData from "../../../constants/iconsData";
import upDownIndex from "../../../helpers/upDownIndex";
import Dialog from "../../../components/Dialog";
import CreatePoll from "../feedDialogs/CreatePoll";
import CreatePost from "../feedDialogs/CreatePost";
import ViewFeed from "../feedDialogs/ViewFeed";
import ProfileFeedData from "../feedDialogs/ProfileFeedData";
import NotificationsData from "../feedDialogs/NotificationData";
import NewsData from "../feedDialogs/NewsData";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";

const PostsArea = ({ profileButtonIndex, setProfileButtonIndex }) => {
  const [whichFeedDialog, setWhichFeedDialog] = useState(null);
  const handleSpecificClose = () => {
    setWhichFeedDialog(null);
    setProfileButtonIndex(null);
  };
  const dynamicDispatch = useDynamicDispatch();
  const handleButtonClick = (i) => {
    setWhichFeedDialog(i);
    dynamicDispatch("OPEN_DIALOG", { dialogType: "" })
  };

  useEffect(() => {
    setWhichFeedDialog(profileButtonIndex);
  }, [profileButtonIndex]);

  return (
    <div
      className={`w-[90%] lg:w-[60%] h-[100vh] lg:h-full opacity-75 relative text-white ${centerItem(
        "justify-evenly"
      )} transition-all flex-col`}
    >
      <Dialog
        classes={"w-full h-full"}
        specificToggle={whichFeedDialog !== null || profileButtonIndex !== null}
      >
        {whichFeedDialog === 0 ? (
          <CreatePost handleSpecificClose={handleSpecificClose} />
        ) : whichFeedDialog === 1 ? (
          <CreatePoll handleSpecificClose={handleSpecificClose} />
        ) : whichFeedDialog === 2 ? (
          <ViewFeed handleSpecificClose={handleSpecificClose} />
        ) : whichFeedDialog === 3 ? (
          <ProfileFeedData handleSpecificClose={handleSpecificClose} />
        ) : whichFeedDialog === 4 ? (
          <></>
        ) : whichFeedDialog === 5 ? (
          <NewsData handleSpecificClose={handleSpecificClose} />
        ) : (
          <NotificationsData handleSpecificClose={handleSpecificClose} />
        )}
      </Dialog>
      <h1
        className={`w-[80%] text-center ${gradient(
          true,
          gradientColors.PRIMARY
        )} gradient-to-l py-4 opacity-80 tracking-[2rem] animate-pulse rounded-full ${
          textColors.PRIMARY
        } tShadow ${titleStyles("text-4xl")} `}
      >
        FEED
      </h1>
      <div
        className={`w-full lg:w-[80%] h-[25%] rounded-[20px] opacity-70 ${centerItem(
          "justify-around"
        )} gap-4`}
      >
        {feedData.postsKinds.titles.map((title, i) => {
          return (
            <a
              onClick={() => handleButtonClick(i)}
              className={`${
                i === 1
                  ? "hover:shadow-[0rem_0rem_1.5rem_10rem_#00ffff4a]"
                  : "hover:shadow-[0rem_0rem_1.5rem_10rem_#ff00ff57]"
              } shadow-[0_0_1.5rem_.5rem_#00ffff4a] transition-all ${centerItem()} ${upDownIndex(
                i
              )} ${gradient(
                false,
                i % 2 === 0 ? gradientColors.PRIMARY : gradientColors.SECONDARY
              )} text-white cursor-pointer flex-col w-[35%] ${titleStyles(
                "text-1xl lg:text-2xl"
              )} p-4 rounded-[20px] ${bgColors.PRIMARY}`}
              key={`postsKinds${i}`}
            >
              <IconComponent
                classes={"text-5xl"}
                Icon={IconsData[feedData.postsKinds.icons[i]]}
              />{" "}
              {title}
            </a>
          );
        })}
      </div>
      <div
        className={`w-[90%] lg:w-[80%] h-[30%] rounded-full hover:scale-95 fly slower shadow-xl hover:shadow transition-all shadow-gray-500
        /20 ${gradient(false, gradientColors.PRIMARY)}`}
      >
        <h1
          onClick={() => handleButtonClick(2)}
          className={`${titleStyles(
            "text-5xl"
          )} cursor-pointer text-white h-full tShadow ${centerItem("")} gap-4`}
        >
          <IconComponent Icon={iconsData["SiAzuredataexplorer"]} />
          View feed
        </h1>
      </div>
    </div>
  );
};

export default PostsArea;
