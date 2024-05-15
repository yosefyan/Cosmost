import React from "react";
import ShopCard from "../../../components/ShopCard";
import shopData from "../../../constants/shopData";

const Ranks = ({current}) => {
  return <ShopCard current={current} data={shopData.categoriesData.Ranks} />;
};

export default Ranks;
