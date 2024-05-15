import React, { useState, useEffect } from "react";
import { centerItem, iconStyles, titleStyles } from "../utils/utils";
import hubSound from "../assets/sounds/hubSound.mp3";
import settingsData from "../constants/SettingsData";
import { bgColors, textColors } from "../constants/colorsData";

const Settings = () => {
  const [audio, setAudio] = useState(null);
  const [range, setRange] = useState(0);
  const [close, setClose] = useState(true);

  useEffect(() => {
    const audioObject = new Audio(hubSound);
    setAudio(audioObject);
    setRange(50);
  }, []);

  useEffect(() => {
    if (audio) {
      audio.play();
      audio.volume = range * 0.01;
      setClose(true);
    }
    return () => {
      if (audio) audio.pause;
    };
  }, [range]);

  const handleRange = ({ value = null, index = null }) => {
    setRange(index || +value);
  };

  return (
    <section
      className={`absolute left-0 top-[10%] w-full lg:w-[20vw] h-fit m-4 p-4 ${centerItem(
        "justify-evenly"
      )} flex-col`}>
      <div
        onClick={() => setClose((prev) => !prev)}
        className={` ${titleStyles("text-3xl")} h-full py-4 ${
          close
            ? "hover:bg-green-500/10 text-green-500"
            : "hover:bg-red-500/10 text-red-500"
        } transition-all cursor-pointer z-20 rounded-full w-full`}>
        {close ? "< --- >" : "X"}
      </div>
      <h1
        className={`text-white w-full ${centerItem()} ${titleStyles(
          "text-3xl"
        )} p-4`}>
        SETTINGS
      </h1>
      <div
        className={`${
          close
            ? "scale-0 opacity-0 absolute"
            : "scale-1 opacity-1 w-full initial"
        } ${centerItem("justify-evenly")} m-auto ${
          bgColors.PRIMARY
        } rounded-full w-[80%] h-[15vh] transition-all flex-col`}>
        <p
          className={`w-full ${titleStyles("text-2xl")} ${textColors.PRIMARY}`}>
          Volume
        </p>
        {/* <input
          onChange={({ target }) => handleRange({ value: target.value })}
          min={0}
          max={100}
          value={range}
          type="range"
          className="relative w-[70%]"
          style={{ zIndex: 40 }}
        /> */}
        <div className={`${centerItem("justify-between")} z-20 w-[70%]`}>
          {Object.values(settingsData.Volume).map((Icon, i) => {
            return (
              <i
                onClick={() => {
                  let index = i === 2 ? 100 : i === 1 ? 50 : 0;
                  handleRange({ index });
                }}
                className={`${iconStyles("text-3xl")} ${centerItem()} ${
                  i < 1
                    ? "text-red-500"
                    : i > 1
                    ? "text-green-500"
                    : "text-orange-500"
                } hover:bg-gray-500/35 p-1 transition-all rounded-full cursor-pointer text-white h-full`}
                key={`settingsData${i}`}>
                <Icon />
              </i>
            );
          })}
        </div>
      </div>
      <div className="w-full h-full absolute top-0 bg-purple-500/10 rounded-lg blur-md"></div>
    </section>
  );
};

export default Settings;
