import React, { useEffect, useState } from "react";
import { centerItem, gradient, titleStyles } from "../../utils/utils";
import { useSelector } from "react-redux";
import PortalNav from "../../components/PortalNav";
import { gradientColors } from "../../constants/colorsData";
import InsideGate from "./feastsShards/InsideGate";
import OuterGate from "./feastsShards/OuterGate";

const Feasts = () => {
  const { userPayload } = useSelector((state) => state.authReducer);
  const [openDoor, setOpenDoor] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState(0);
  const handleOpenDoor = () => {
    setOpenDoor((prev) => !prev);
  };

  const feastsCategories = Array(3).fill("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDisplay((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-[100vw] overflow-hidden lg:h-[100vh] CardDisplayer relative bgGradientFeasts bg-black ${centerItem()} flex-col`}
    >
      <PortalNav widthHeight={`w-full h-[25vh] lg:h-[20%] opacity-40`} />
      <div className={`w-full h-[100vh] lg:h-full ${centerItem()} flex-col`}>
        {!openDoor && (
          <h1
            className={`${titleStyles("text-7xl")} tShadow fly ${gradient(
              true,
              gradientColors.PRIMARY
            )}`}
          >
            Press the locker
          </h1>
        )}
        <div
          className={`w-[100%] h-[90%] transition-all overflow-hidden rounded-b-[45%] inline-flex ${centerItem()}`}
        >
          <InsideGate
            openDoor={openDoor}
            userPayload={userPayload}
            feastsCategories={feastsCategories}
            currentDisplay={currentDisplay}
          />
          <OuterGate
            openDoor={openDoor}
            userPayload={userPayload}
            feastsCategories={feastsCategories}
            handleOpenDoor={handleOpenDoor}
          />
        </div>
      </div>
    </div>
  );
};

export default Feasts;
