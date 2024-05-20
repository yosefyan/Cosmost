import React from "react";
import {
  centerItem,
  gradient,
  titleStyles,
  triangleStyles,
} from "../../utils/utils";
import { gradientColors, textColors } from "../../constants/colorsData";
import IconComponent from "../../components/IconComponent";
import PortalNav from "../../components/PortalNav";
import aboutData from "../../constants/aboutData";
import AboutReviews from "./aboutSections/AboutReviews";
import AboutWhyUs from "./aboutSections/AboutWhyUs";
import * as iconsData from "../../constants/iconsData";

const About = () => {
  return (
    <div
      className={`w-[100vw] overflow-y-scroll bg-fireworks-pattern bg-[length:100%_100%] lg:overflow-hidden h-[100vh] bg-black ${centerItem(
        "justify-evenly"
      )}`}
    >
      <div
        className={`w-full h-full h-[70%] display-initial lg:${centerItem(
          "justify-evenly"
        )} flex-col`}
      >
        <PortalNav widthHeight={`w-full h-[20%] opacity-40`} />
        <div
          className={`w-full h-fit lg:h-[90vh] m-auto ${centerItem()} flex-col gap-[5rem] lg:gap-0 lg:flex-row justify-around`}
        >
          <AboutReviews />
          <div
            className={`w-1/3 h-[60%] relative fly ${centerItem(
              "justify-start"
            )} flex-col`}
          >
            <div
              className={`absolute blur-[4rem] top-[-25%] ${triangleStyles(
                false,
                `border-t-[50rem]`
              )}`}
            ></div>
            <div className="w-[80%] h-full absolute rotateCircle rounded-full">
              {aboutData.planets.Icons.map((planet, i) => {
                return (
                  <IconComponent
                    classes={`h-full  ${titleStyles(
                      "text-6xl"
                    )} blur-[4rem] text-white/70`}
                    Icon={iconsData[planet]}
                  />
                );
              })}
            </div>
            <IconComponent
              classes={`rounded-[100px] drop-shadow-[0_0_35px_#8a2be2] ${gradient(
                false,
                gradientColors.PRIMARY
              )} ${titleStyles("text-[15rem]")}`}
              Icon={iconsData["IoPlanet"]}
            />
            <h1
              className={` ${centerItem()} ${titleStyles(
                "text-7xl"
              )} p-4 ${gradient(true, gradientColors.PRIMARY)}`}
            >
              Cosmost
            </h1>
            <h3
              className={`${titleStyles("text-1xl")} ${centerItem(
                "justify-evenly"
              )} text-center ${textColors.PRIMARY}`}
            >
              Explore and host, while getting the Cosmost.
            </h3>
          </div>
          <AboutWhyUs />
        </div>
      </div>
    </div>
  );
};

export default About;
