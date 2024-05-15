import React, { useState } from "react";
import { centerItem } from "../../utils/utils";
import FriendsSettings from "./chatShards/FriendsSettings";
import PortalNav from "../../components/PortalNav";
import messagesData from "../../constants/messagesData";
import { useSelector } from "react-redux";
import Screen from "./chatShards/Screen";

const Chat = () => {
  const [whichToShow, setWhichToShow] = useState(0);
  const [userData, setUserData] = useState({ data: null, i: null });
  const { userPayload } = useSelector((state) => state.authReducer);

  const handleIcons = (i) => {
    setWhichToShow(i);
  };

  const handleUserData = (data) => {
    setUserData(data);
  };

  return (
    <div
      className={`w-[100vw] overflow-hidden lg:h-[100vh] relative bgGradientChat bg-black ${centerItem(
        "justify-evenly"
      )} flex-col lg:flex-row`}
    >
      <PortalNav />
      <div className={`w-[80%] lg:w-[40%] relative h-[100vh] lg:h-full`}>
        <FriendsSettings whichToShow={whichToShow} handleIcons={handleIcons} />
        {messagesData.componentsData.map((Component, i) => {
          return (
            <React.Fragment key={`messagesDataComponents${i}`}>
              <Component
                handleUserData={Component.name === "Friends" && handleUserData}
                classes={`${
                  i === whichToShow
                    ? "translate-y-0 scale-1"
                    : "translate-y-[-100vh] scale-0"
                } w-full h-[60%] transition-all absolute`}
                i={i}
                userPayload={userPayload}
                whichToShow={whichToShow}
              />
            </React.Fragment>
          );
        })}
      </div>
      <Screen
        whichToShow={whichToShow}
        handleIcons={handleIcons}
        userData={userData}
      />
    </div>
  );
};

export default Chat;
