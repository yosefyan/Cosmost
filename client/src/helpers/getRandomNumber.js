const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * max) + min;
};

export default getRandomNumber;
