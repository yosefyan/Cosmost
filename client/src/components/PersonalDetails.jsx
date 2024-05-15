import React from "react";
import { centerItem, titleStyles } from "../utils/utils";
import { textColors } from "../constants/colorsData";
import FlyBoard from "./FlyBoard";
import * as iconsData from "../constants/iconsData";
import IconComponent from "./IconComponent";
import TimeComponent from "../hooks/useTimeEffect";
import NavigateComponent from "./NavigateComponent";

const PersonalDetails = ({ inputs, classes }) => {
  return (
    <div
      className={`w-full lg:w-1/2 ${
        classes ? classes : "h-[90%]"
      } lg:upDown rotateSpace transition-all ${centerItem()} flex-col`}
    >
      <h1 className={`${titleStyles("text-6xl")} ${textColors.SECONDARY}`}>
        Register
      </h1>
      <h3 className={`p-4 ${titleStyles("text-3xl")} ${textColors.TERTIARY}`}>
        Your flight adventure begins.
      </h3>
      <div className="lg:rotateSpace drop-shadow-[0_35px_35px_purple] w-[90%] h-full">
        <section className={`${centerItem()} ${titleStyles("text-4xl")} p-4`}>
          <IconComponent
            Icon={iconsData["MdOutlineFlight"]}
            classes={`${textColors.SECONDARY} p-4`}
          />
          <h1 className={`${textColors.PRIMARY}`}>Depratures</h1>
        </section>
        <FlyBoard
          data={{
            titles: ["Time", "Flight", "Gate", "Remarks"],
            Icons: [
              "IoIosTime",
              "RiInputCursorMove",
              "FaDatabase",
              "GrStatusGood",
            ],
            inputs,
          }}
        />
      </div>
      <NavigateComponent
        message={"Have an account? feel free to"}
        name={"Login"}
      />
    </div>
  );
};

export default PersonalDetails;
