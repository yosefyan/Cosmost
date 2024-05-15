import React from "react";
import MessageFormat from "../../../components/MessageFormat";
import { centerItem } from "../../../utils/utils";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import inputsData from "../../../constants/inputsData";
import { emailPasswordSettings } from "../../../constants/validationData";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import useFormValidation from "../../../hooks/useFormValidation";
import { useSelector } from "react-redux";

const DataArea = () => {
  const { userPayload } = useSelector((state) => state.authReducer);
 
  const { inputs, data } = useGenerateInputs({
    submitRequest: {
      method: "patch",
      api: "local",
      endpoint: `/users/patchUser/${userPayload._id}`,
      shouldToken: true,
      shouldNorm: "editProfile",
    },
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Updated data succesfully! Please log in again to refresh your data.",
    },
    transferRoute: "/login",
    fullContainer: `${centerItem("", "items-end")} grid flex-col h-[100vh] lg:h-full`,
    array: [
      ...inputsData.registerInputs.filter(
        (input) => !input.includes("Email") && !input.includes("Password")
      ),
    ],
    titles: [
      ...inputsData.registerTitles.filter(
        (_, i) => i !== 1 && i !== 2 && i !== 3
      ),
    ],
    eachContainer: `w-full min-h-[100vh] ${centerItem(
      "justify-evenly"
    )} flex-col`,
    initialRequest: {
      method: "get",
      api: "local",
      endpoint: `/users/getUserById/${userPayload._id}`,
      shouldToken: true,
      dontAffectInputs: false
    },
  });

  useFormValidation({
    inputs,
    specialData: {
      ...emailPasswordSettings,
      Repeat_Password: emailPasswordSettings.Password,
      Profile_Picture: { type: "url" },
      Bio: { min: 15 },
    },
  });

  return (
    <MessageFormat
      classes={`w-[90%] lg:w-[40%] ${centerItem(
        "justify-evenly"
      )} flex-col shadow shadow-white h-full shadow-xl shadow-black opacity-65`}
    >
      <div className={`w-[90%] bg-black h-full bg-black rounded-[20px]`}>
        {data}
      </div>
    </MessageFormat>
  );
};

export default DataArea;
