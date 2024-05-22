import React from "react";
import { centerItem } from "../../utils/utils";
import Basement from "../../components/Basement";
import useGenerateInputs from "../../hooks/useGenerateInputs";
import PersonalDetails from "../../components/PersonalDetails";
import useFormValidation from "../../hooks/useFormValidation";
import { emailPasswordSettings } from "../../constants/validationData";
import PortalNav from "../../components/PortalNav";
import { toastifyStatuses } from "../../helpers/toastifyHelper";
import inputsData from "../../constants/inputsData";

const Register = () => {
  const { inputs, data } = useGenerateInputs({
    secondReq: false,
    submitRequest: {
      method: "post",
      api: "local",
      endpoint: "/users/register",
      specificInputs: {
        Rank: "Cosmic",
        moneyData: { coins: 250, gems: 500 },
        ownedStuff: {
          titles: [],
          pets: [],
          ranks: [],
        },
      },
      shouldNorm: "Register",
    },
    initialRequest: false,
    transferRoute: "/login",
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Register succesful!",
    },
    array: [...inputsData.registerInputs],
    fullContainer: `${centerItem("", "items-end")} grid flex-col h-full`,
    titles: [...inputsData.registerTitles],
    eachContainer: `w-full min-h-[100vh] ${centerItem(
      "justify-evenly"
    )} flex-col`,
  });
  useFormValidation({
    inputs,
    specialData: {
      ...emailPasswordSettings,
      Repeat_Password: emailPasswordSettings.Password,
      Profile_Picture: { type: "url" },
      Username: { min: 1 },
      Bio: { min: 15 },
    },
  });
  return (
    <div
      className={`w-[100vw] lg:h-[100vh] flex-col lg:flex-row sm:bg-black bgGradientShop lg:bgGradientRegister overflow-y-scroll lg:overflow-hidden h-initial ${centerItem()}`}
    >
      <PersonalDetails inputs={inputs} />
      <div className={"w-full lg:w-1/2 h-[100vh] overflow-y-scroll"}>
        <Basement />
        {data}
      </div>
      <PortalNav />
    </div>
  );
};

export default Register;
