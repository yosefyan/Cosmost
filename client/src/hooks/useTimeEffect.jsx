import React, { useEffect, useState } from "react";
import { centerItem } from "../utils/utils";
import getCurrentTime from "../utils/dateUtils";
import { textColors } from "../constants/colorsData";
const useTimeEffect = () => {
   const date = new Date();
  let timesInterval = {
    oneSecond: 1000,
    oneMinute: 1000 * 60,
    oneHour: 1000 * 60 * 24,
  };

  const [looper, setLooper] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [times, setTimes] = useState({
    hours: date.getHours(),
    minutes:
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    seconds: date.getSeconds(),
  });

  useEffect(() => {
    const secondInterval = setInterval(() => {
      setLooper((prev) => ({
        ...prev,
        seconds: prev.seconds - 100,
      }));
    }, timesInterval.oneSecond);

    const mainInterval = setInterval(() => {
      setTimes(getCurrentTime());
      setLooper({
        seconds: 0,
        minutes: 0,
        hours: 0,
      });
    }, timesInterval.oneSecond + 100);

    return () => {
      clearInterval(secondInterval);
      clearInterval(mainInterval);
    };
  }, [times.seconds]);

  useEffect(() => {
    setLooper((prev) => ({
      ...prev,
      minutes: prev.minutes - 100,
    }));
  }, [times.minutes]);

  useEffect(() => {
    setLooper((prev) => ({
      ...prev,
      hours: prev.hours - 100,
    }));
  }, [times.hours]);

  return (
    <div className={`flex-1 ${centerItem("justify-end")} text-end`}>
      <ul className={`${centerItem("flex-start")} overflow-hidden`}>
        {Object.values(times).map((time, index) => (
          <li
            className={`${centerItem()} ${textColors.TERTIARY}`}
            key={`timesHook${index}`}>
            <p
              style={
                index === 2
                  ? { top: `${looper.seconds}px` }
                  : index === 1
                  ? { top: `${looper.minutes}px` }
                  : { top: `${looper.hours}px` }
              }
              className={`max-h-[10vh]  relative transition-all flex-col ${centerItem()} flex-col`}>
              <span>{time}</span>
            </p>
            {index !== Object.values(times).length - 1 && ":"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default useTimeEffect;
