import aboutData from "../constants/aboutData";
import getRandomNumber from "./getRandomNumber";

const getRandomElementFromArray = (array) => {
  const randomIndex = getRandomNumber(array.length);
  return array[randomIndex];
};

const { reviewsData, whyUsData } = aboutData;

const getRandomReview = () => {
  let data = [
    reviewsData.Icons,
    reviewsData.Reviews,
    whyUsData.Icons,
    whyUsData.Reviews,
  ];
  let res = data.map((da) => {
    return getRandomElementFromArray(da);
  });
  const [person, review, planet, whyUs] = res;

  return {
    person,
    review,
    planet,
    whyUs
  };
};

export default getRandomReview;
