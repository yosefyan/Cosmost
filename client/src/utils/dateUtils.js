const getCurrentTime = () => {
  const date = new Date();
  return {
    date,
    hours: date.getHours(),
    minutes:
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    seconds:
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
  };
};

export default getCurrentTime;
