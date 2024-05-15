import React, { useState } from "react";
import { PostsArea } from "./feedShards";
import { centerItem } from "../../utils/utils";
import PortalNav from "../../components/PortalNav";
import MyProfile from "../../components/MyProfile";
import UserTopIcons from "./feedShards/UserTopIcons";

const Feed = () => {
  const [profileButtonIndex, setProfileButtonIndex] = useState(null);

  const handleProfileButtons = (i) => setProfileButtonIndex(i);
  return (
    <div
      className={`bg-black w-full lg:h-[100vh] bgGradientFeed ${centerItem(
        "justify-evenly"
      )} flex-col lg:flex-row`}
    >
      <>
        <PortalNav />
        <div
          className={`w-full h-[100vh] lg:w-[30%] lg:h-full ${centerItem(
            "justify-around"
          )} bg-black flex-col shadow-xl relative shadow-[fuchsia]`}
        >
          <UserTopIcons
            handleProfileButtons={(i) => handleProfileButtons(i === 0 ? 5 : 6)}
          />
          <MyProfile
            handleProfileButtons={(i) => handleProfileButtons(i === 0 ? 3 : 4)}
            classes={`w-full bg-hero-pattern bg-[length:100%_100%] h-[80%] ${centerItem(
              "justify-evenly"
            )} flex-col`}
          />
        </div>
        <PostsArea
          profileButtonIndex={profileButtonIndex}
          setProfileButtonIndex={setProfileButtonIndex}
        />
      </>
    </div>
  );
};

export default Feed;
