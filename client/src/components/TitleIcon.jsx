import React from "react";
import IconComponent from "./IconComponent";
import * as iconsData from "../constants/iconsData";

const TitleIcon = ({ classes, title, icon, key }) => {
  return (
    <div key={key} className={classes}>
      <IconComponent classes={"text-[3rem]"} Icon={iconsData[icon]} />
      <p>{title}</p>
    </div>
  );
};

export default TitleIcon;
