import React, { useEffect, useState } from "react";
import CloseDialog from "../../../components/CloseDialog";
import {
  buttonStyles,
  centerItem,
  gradient,
  titleStyles,
} from "../../../utils/utils";
import { bgColors, gradientColors } from "../../../constants/colorsData";
import { useSelector } from "react-redux";
import colorKey from "../../../helpers/colorKey";
import upDownIndex from "../../../helpers/upDownIndex";
import * as iconsData from "../../../constants/iconsData";
import IconComponent from "../../../components/IconComponent";
import CoinsGems from "../../../components/CoinsGems";
import AreYouSure from "../../../components/AreYouSure";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";
import serverRoutes from "../../../constants/serverRoutes";

const CartDialog = () => {
  const { cartData, totalSum, moneyData, ownedStuff } = useSelector(
    (state) => state.shopReducer
  );

  const dynamicDispatch = useDynamicDispatch();
  const getAllCartData = JSON.parse(localStorage.getItem("cartData"));
  const [ask, setAsk] = useState({
    shouldOpen: false,
    indexToDelete: null,
    whichAction: null,
  });
  let neededOne = getAllCartData || cartData;

  useEffect(() => {
    if (totalSum) {
      dynamicDispatch("CALCULATE_SUM", cartData.flat());
    }
  }, [ask]);

  useEffect(() => {
    dynamicDispatch("SET_CART", neededOne);
    dynamicDispatch("DELETE_CART_ITEM", cartData.length * 99999999);
    dynamicDispatch("CALCULATE_SUM", neededOne);
  }, []);
  const handleDeleteItem = async (i) => {
    const newCoinsValue = moneyData.coins - totalSum.coins;
    const newGemsValue = moneyData.gems - totalSum.gems;
    const filteredData = cartData.map((data) => {
      const { bottomPart, ...rest } = data;
      return rest;
    });

    const newOwnedStuffData = {
      ranks: [
        ...(ownedStuff.ranks || ""),
        ...filteredData.filter((data) => data.topPart.Type === "Ranks"),
      ],
      pets: [
        ...(ownedStuff.pets || ""),
        ...filteredData.filter((data) => data.topPart.Type === "Pets"),
      ],
      titles: [
        ...(ownedStuff.titles || ""),
        ...filteredData.filter((data) => data.topPart.Type === "Titles"),
      ],
    };
    setAsk((prev) => ({ ...prev, shouldOpen: false }));
    if (i === 1) {
      if (ask.whichAction === "toDelete") {
        const { indexToDelete } = ask;
        const updatedCartData = cartData
          .flat()
          .filter((_, index) => index !== indexToDelete);
        dynamicDispatch("DELETE_CART_ITEM", { indexToDelete });
        localStorage.setItem("cartData", JSON.stringify(updatedCartData));
      } else {
        try {
          if (newCoinsValue > 0 || newGemsValue > 0) {
            dynamicDispatch("SET_MONEY", {
              coins: newCoinsValue,
              gems: newGemsValue,
            });
            dynamicDispatch("SET_OWNED_STUFF", {
              ...newOwnedStuffData,
            });
            await dynamicAxiosMethod({
              method: "put",
              endpoint: serverRoutes.put.updateMoney,
              shouldToken: true,
              innerData: {
                moneyData: {
                  coins: newCoinsValue,
                  gems: newGemsValue,
                },
              },
            });
            await dynamicAxiosMethod({
              method: "put",
              endpoint: serverRoutes.put.updateOwnStuff,
              shouldToken: true,
              innerData: {
                ownedStuff: { ...newOwnedStuffData },
              },
            });
            toastifyHelper({
              status: toastifyStatuses.success,
              message: `Purchased succesfully!`,
            });
            dynamicDispatch("DELETE_WHOLE_CART");
            localStorage.removeItem("cartData");
          } else {
            toastifyHelper({
              status: toastifyStatuses.error,
              message: `You dont have enough ${
                newCoinsValue < 0 && newGemsValue < 0
                  ? "coins and gems."
                  : newCoinsValue < 0
                  ? "coins."
                  : "gems."
              }`,
            });
          }
        } catch (error) {}
      }
    }
  };

  return (
    <dialog
      className={`w-full lg:w-[70vw] h-full lg:h-[90vh] bg-hero-pattern bg-[length:100%_100%] rounded-[20px] ${centerItem()} flex-col`}
    >
      <div
        className={`w-[90%] bg-black/80 rounded-t-[30px] p-8 ${centerItem(
          "justify-between"
        )} flex-col lg:flex-row`}
      >
        <h1
          className={`${titleStyles(
            "text-5xl"
          )} drop-shadow-[0_0_.4rem_black] shadow-black ${gradient(
            true,
            gradientColors.PRIMARY
          )} decoration-8`}
        >
          Cart
        </h1>
        <CoinsGems
          data={[moneyData.coins.toString(), moneyData.gems.toString()]}
        />
        <CloseDialog handleSpecificClose={() => null} />
      </div>
      <div className={`w-[90%] h-[70%] overflow-y-scroll bg-black/60 p-8`}>
        {cartData?.flat().map((cart, i) => {
          return (
            <div
              className={`${centerItem()} shadow-md ${upDownIndex(
                i
              )} w-full ${titleStyles(
                "text-3xl"
              )} h-[15%] rounded-[30px] overflow-hidden mb-8 ${
                i % 2 === 0 ? `${bgColors.PRIMARY}` : `${bgColors.SECONDARY}`
              }`}
              key={`cartData${i}`}
            >
              {Object.entries({
                ...cart.leftPart,
                ...cart.topPart,
                ...cart.bottomPart,
              }).map(([key, value], index) => {
                return (
                  <>
                    {index === 0 ? (
                      <IconComponent
                        classes={`w-1/2 text-5xl h-full ${centerItem()} bg-black/75 text-white/50`}
                        Icon={iconsData[cartData[i].leftPart.imgSrc]}
                      />
                    ) : index <= 3 ? (
                      <p
                        className={`w-full ${titleStyles(
                          value.length > 5 ? "text-2xl" : "text-4xl"
                        )} ${
                          index === 1 || index === 2
                            ? ` h-full ${centerItem()}  ${
                                index === 1
                                  ? "bg-black/50"
                                  : index === 2
                                  ? "bg-black/25 rounded-r-[20px]"
                                  : ""
                              }`
                            : ""
                        } ${colorKey(key, value)}`}
                        key={`cartDataTopPart${index}`}
                      >
                        {value}
                      </p>
                    ) : (
                      <CoinsGems
                        data={cart.bottomPart.coinsGems}
                        classes={`w-full flex-col-reverse ${titleStyles(
                          "text-[1.2rem]"
                        )}`}
                        shouldExplain={false}
                      />
                    )}
                  </>
                );
              })}
              <IconComponent
                onClick={() =>
                  setAsk({
                    shouldOpen: true,
                    indexToDelete: i,
                    whichAction: "toDelete",
                  })
                }
                classes={`text-white/80 ${centerItem()} w-1/2 h-full cursor-pointer`}
                Icon={iconsData["MdDelete"]}
              />
            </div>
          );
        })}
      </div>
      <div
        className={`w-[90%] h-[10%] bg-black ${centerItem("justify-evenly")}`}
      >
        <p
          className={`${titleStyles(
            "text-2xl lg:text-5xl"
          )} drop-shadow-[0_0_.4rem_black] w-1/2 lg:w-full shadow-black ${centerItem()} ${gradient(
            true,
            gradientColors.PRIMARY
          )} decoration-8`}
        >
          TOTAL
        </p>
        <CoinsGems
          data={[totalSum.coins, totalSum.gems]}
          shouldExplain={false}
        />
        <button
          onClick={() =>
            cartData.length > 0 &&
            setAsk({
              shouldOpen: true,
              indexToDelete: null,
              whichAction: "toPurchase",
            })
          }
          className={`${buttonStyles('text-1xl lg:text-2xl')} ${centerItem(
            "justify-evenly"
          )} w-[10%] lg:w-[70%] h-[80%] shadow-xl shadow-gray-500/50 ${
            bgColors[cartData.length > 0 ? "SECONDARY" : "TERTIARY"]
          } rounded-[20px]`}
        >
          <IconComponent Icon={iconsData["BiSolidPurchaseTag"]} />
          Purchse
        </button>
      </div>
      <AreYouSure
        data={0}
        shouldAddDialog={ask}
        handleStatus={handleDeleteItem}
      />
    </dialog>
  );
};

export default CartDialog;
