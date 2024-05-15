import React, { useState } from "react";
import MuseumGlass from "../shopSections/MuseumGlass";
import SideShopDialogInfo from "./SideShopDialogInfo";
import { centerItem } from "../../../utils/utils";
import AreYouSure from "../../../components/AreYouSure";
import { useSelector } from "react-redux";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";

const ShopDialog = () => {
  const [shouldAddDialog, setShouldAddDialog] = useState(false);
  const { currentShopData } = useSelector((state) => state.shopReducer);
  const dynamicDispatch = useDynamicDispatch();

  const handleAddCart = () => {
    dynamicDispatch("SET_AXIOS_DATA", {
      toastifyMessage: "Added to cart succesfully.",
    });
    setShouldAddDialog((prev) => !prev);
    dynamicDispatch("SET_CART", currentShopData);
    localStorage.setItem(
      "cartData",
      JSON.stringify(
        localStorage.getItem("cartData")
          ? [
              ...JSON.parse(localStorage.getItem("cartData")).flat(),
              currentShopData,
            ]
          : [currentShopData]
      )
    );
    toastifyHelper({
      status: toastifyStatuses.success,
      message: "Added to cart succesfully.",
    });
    let timeout = setTimeout(() => {
      dynamicDispatch("CLOSE_DIALOG");
    }, 400);
    return () => clearTimeout(timeout);
  };

  return (
    <div
      className={`CardDisplayer rounded-[30px] w-[80%] h-full lg:h-[80%] shadow-xl shadow-black bg-hero-pattern bg-[length:100%_100%] absolute ${centerItem()} flex-col-reverse lg:flex-row bRadius trans`}
    >
      <MuseumGlass data={currentShopData.leftPart.imgSrc} />
      <SideShopDialogInfo handleStatus={handleAddCart} should />
      <AreYouSure
        handleStatus={handleAddCart}
        shouldAddDialog={shouldAddDialog}
      />
    </div>
  );
};

export default ShopDialog;
