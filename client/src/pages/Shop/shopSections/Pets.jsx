import React from 'react'
import shopData from '../../../constants/shopData';
import ShopCard from '../../../components/ShopCard';

const Pets = ({current}) => {
  return <ShopCard current={current} data={shopData.categoriesData.Pets} />;
}

export default Pets