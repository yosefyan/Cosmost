import React from "react";
import { centerItem } from "../../utils/utils";
import stars from "../../assets/gifs/fireworks.gif";

const Loading = () => {
  return (
    <div className={`w-full h-full bg-stars-pattern bg-black absolute`}>
      <div className={`portal absolute getIn ${centerItem()}`}>
        <img src={stars} alt="black hole" />
      </div>
    </div>
  );
};

export default Loading;
