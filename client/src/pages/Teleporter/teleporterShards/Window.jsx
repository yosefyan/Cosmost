import React from "react";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import {
  bordersColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import IconComponent from "../../../components/IconComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as iconsData from "../../../constants/iconsData";

const Window = ({ role, i, handleName }) => {
  let { data } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();

  return (
    <div
      onMouseOut={() => handleName(null, null)}
      onMouseOver={() => handleName(role, i)}
      onClick={() =>
        navigate(`/${role.toLowerCase() === "home" ? "" : role.toLowerCase()}`)
      }
      className={`${centerItem()} flex-col shadow-xl ${
        i % 2 === 0 && i !== null ? "shadow-blue-500" : "shadow-fuchsia-500"
      } hover:shadow-gray-500 cursor-pointer rounded-[15px] hover:scale-95 bg-black ${
        bordersColors.SECONDARY
      } transition-all w-[20vw] ${
        i % 2 === 0 && i !== null
          ? `fly ${gradient(false, gradientColors.PRIMARY)} -skew-y-12`
          : `flyOpposite skew-y-12 ${gradient(false, gradientColors.SECONDARY)}`
      } text-white opacity-50 w-full h-full rounded-1/4 gap-4`}
    >
      <IconComponent
        classes={`text-8xl p-8 bg-black/10 rounded-full ${
          i % 2 === 0 && i !== null ? textColors.PRIMARY : textColors.SECONDARY
        }`}
        Icon={iconsData[data.iconsData[i] || "FaHome"]}
      />
      <p
        className={`${
          textColors.TERTIARY
        } drop-shadow-[0_0_1rem_black] ${titleStyles("text-3xl")}`}
      >
        {role}
      </p>
    </div>
  );
};

export default Window;
