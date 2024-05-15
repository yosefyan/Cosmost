import React from "react";
import { useNavigate } from "react-router-dom";
import { textColors } from "../constants/colorsData";

const NavigateComponent = ({ message, name }) => {
  const navigate = useNavigate();
  return (
    <p className={`${textColors.TERTIARY}`}>
      {message}
      <span
        onClick={() => navigate(`/${name.toLowerCase()}`)}
        className={`p-2 underline cursor-pointer ${textColors.PRIMARY}`}>
        {name}
      </span>
    </p>
  );
};

export default NavigateComponent;
