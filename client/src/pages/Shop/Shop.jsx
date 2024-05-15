import React, { useEffect, useState } from "react";
import { centerItem, gradient, titleStyles } from "../../utils/utils";
import PortalNav from "../../components/PortalNav";
import shopData from "../../constants/shopData";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../constants/colorsData";
import CoinsGems from "../../components/CoinsGems";
import * as iconsData from "../../constants/iconsData";
import IconComponent from "../../components/IconComponent";
import Dialog from "../../components/Dialog";
import ShopDialog from "./shopDialogs/ShopDialog";
import CartDialog from "./shopDialogs/CartDialog";
import { useSelector } from "react-redux";
import dynamicAxiosMethod from "../../helpers/dynamicAxiosMethod";
import useDynamicDispatch from "../../hooks/useDynamicDispatch";
import serverRoutes from "../../constants/serverRoutes";
import isMobileDevice from "../../helpers/isMobile";

const Shop = () => {
  const { dialogType, userPayload, moneyData } = useSelector((state) => ({
    dialogType: state.globalReducer.dialogData.dialogType,
    userPayload: state.authReducer.userPayload,
    moneyData: state.shopReducer.moneyData,
  }));
  const [currentHolder, setCurrentHolder] = useState(null);
  const Component = shopData.shopFiles[currentHolder];
  const dynamicDispatch = useDynamicDispatch();

  useEffect(() => {
    const getMyData = async () => {
      try {
        const { data } = await dynamicAxiosMethod({
          method: "get",
          endpoint: `${serverRoutes.get.getUserById}${userPayload._id}`,
          shouldToken: true,
        });
        const { coins, gems } = data[0].moneyData;
        dynamicDispatch("SET_MONEY", {
          coins,
          gems,
        });
      } catch (error) {}
    };
    getMyData();
  }, []);

  return (
    <div
      className={`w-[100vw] lg:h-[100vh] relative bgGradientShop ${centerItem(
        "justify-evenly"
      )} flex-col lg:flex-row`}
    >
      <Dialog
        specificToggle={dialogType}
        classes={`${centerItem()} w-full h-[100vh] lg:h-full`}
      >
        {dialogType === "cardInfoDialog" ? <ShopDialog /> : <CartDialog />}
      </Dialog>
      <PortalNav />
      <div className="w-full lg:w-[60%] h-[90%] overflow-y-scroll">
        <div className={`w-full h-[10%] ${centerItem()}`}>
          <CoinsGems
            data={[moneyData?.coins?.toString(), moneyData?.gems?.toString()]}
          />
          <div
            onClick={() => {
              isMobileDevice();
              dynamicDispatch("OPEN_DIALOG", { dialogType: "cartDialog" });
            }}
            className={`${
              bgColors.SECONDARY
            } cursor-pointer hover:opacity-75 transition-all w-[30%] ${titleStyles(
              "text-3xl"
            )} h-full rounded-[20px] ${centerItem(
              ""
            )} shadow-xl shadow-gray-500/50 gap-4 ${textColors.PRIMARY}`}
          >
            <IconComponent Icon={iconsData["FaCartArrowDown"]} />
            <p className={`h-[10vh] lg:h-initial ${centerItem()}`}>Cart</p>
          </div>
        </div>
        <p
          className={`text-center w-[75%] m-auto lg:w-full ${titleStyles(
            "text-2xl"
          )} my-6 p-4 ${gradient(true, gradientColors.PRIMARY)}`}
        >
          Like and share posts on Feed to get coins/gems!
        </p>
        {currentHolder === null ? (
          <div
            className={`w-full rotateSpace h-[70%] ${centerItem()} flex-col`}
          >
            <IconComponent
              classes={`${
                textColors.PRIMARY
              } drop-shadow-[0_0_35px_fuchsia] ${titleStyles("text-[18rem]")}`}
              Icon={iconsData["BsQuestion"]}
            />
            <h1
              className={`${titleStyles("text-6xl")} ${gradient(
                true,
                gradientColors.PRIMARY
              )}`}
            >
              Choose your category...
            </h1>
          </div>
        ) : (
          <Component current={currentHolder} />
        )}
      </div>
      <div
        className={`w-[80%] lg:w-[15%] fly h-[65%] relative ${centerItem()} flex-col`}
      >
        {shopData.sideNav.icons.map((Icon, i) => {
          return (
            <div
              onClick={() => setCurrentHolder(i)}
              className={`w-full ${centerItem()} h-full ${
                currentHolder !== i
                  ? `rotate`
                  : `${
                      currentHolder === 0
                        ? "bg-orange-900/15"
                        : currentHolder === 1
                        ? "bg-cyan-500/10"
                        : "bg-blue-500/30"
                    }`
              } slow hover:scale-[.8] cursor-pointer rounded-[20px] flex-col transition-all ${titleStyles(
                "text-[3rem]"
              )} ${
                textColors.PRIMARY
              } shadow-xl overflow-hidden shadow-cyan-500/50`}
              key={`shopDataIcons${i}`}
            >
              <IconComponent classes={`text-8xl`} Icon={iconsData[Icon]} />
              <p>{shopData.sideNav.titles[i]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
