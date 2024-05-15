import React from "react";
import shopData from "../../../constants/shopData";
import ShopCard from "../../../components/ShopCard";

const Titles = ({ current }) => {
  return <ShopCard current={current} data={shopData.categoriesData.Titles} />;
};

export default Titles;
