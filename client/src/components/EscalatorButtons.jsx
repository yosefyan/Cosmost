import React, { useEffect, useState } from "react";
import { buttonStyles, centerItem } from "../utils/utils.js";
import { bgColors } from "../constants/colorsData.js";
import { useSelector } from "react-redux";
import toastifyHelper, { toastifyStatuses } from "../helpers/toastifyHelper.js";
import dynamicAxiosMethod from "../helpers/dynamicAxiosMethod.js";
import normalizeData from "../utils/normalizeData.js";
import { useNavigate } from "react-router-dom";
import { uploadInstance } from "../utils/axiosSetup.js";
import useDynamicDispatch from "../hooks/useDynamicDispatch.js";

const EscalatorButtons = ({
  container,
  genericIndex,
  inputs,
  clearInputs,
  submitRequest,
  toastifyData,
  transferRoute,
  initialData,
  selectedFile,
  secondReq = false,
}) => {
  const { userPayload, errors } = useSelector((state) => ({
    userPayload: state.authReducer.userPayload,
    errors: state.globalReducer.errors,
  }));
  const dynamicDispatch = useDynamicDispatch();
  const navigate = useNavigate();
  const {
    method,
    api,
    endpoint,
    data,
    specificInputs,
    shouldToken = false,
    shouldNorm,
  } = submitRequest;
  const { status, message } = toastifyData;
  const buttons = ["Previous", "Next"];
  const [scrollSettings, setScrollSettings] = useState({
    times: 0,
    height: 0,
  });
  const [finalPicture, setFinalPicture] = useState(null);

  const handleButtons = async (buttonNameIndex) => {
    (buttonNameIndex === 0 ||
      Object.values(errors[genericIndex])[0].length === 0) &&
      setScrollSettings({
        height: container.current.clientHeight,
        times: buttonNameIndex === 0 ? genericIndex - 1 : genericIndex + 1,
      });
    if (
      buttonNameIndex === 1 &&
      Object.keys(inputs).length - 1 === genericIndex
    ) {
      try {
        if (
          ((data.Profile_Picture || data.userData) &&
            ((data.userData &&
              data.userData.Profile_Picture.startsWith("blob")) ||
              data.Profile_Picture.startsWith("blob"))) ||
          (data.image && data.image.Upload.startsWith("blob"))
        ) {
          const formData = new FormData();
          formData.append("image", selectedFile);
          const res = await dynamicAxiosMethod({
            shouldToken: /register/g.test(endpoint) ? false : true,
            method: "post",
            endpoint: "/",
            innerData: formData,
            instance: uploadInstance,
          });
          setFinalPicture(res.data);
        }
        const res = await dynamicAxiosMethod({
          method,
          endpoint,
          shouldToken,
          innerData: shouldNorm
            ? await normalizeData(
                {
                  ...(/register/g.test(endpoint)
                    ? {
                        ...data,
                        finalPicture,
                        ...specificInputs,
                      }
                    : { ...initialData[0].userData, ...data }),
                },
                userPayload
              )[shouldNorm]
            : { ...data, ...specificInputs },
        });

        if (method === "patch" && endpoint.includes("patchUser")) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        if (secondReq && res.data) {
          const logic = secondReq.includeFromFirstReq.keys.map(
            (key, innerIndex) => ({
              [key]:
                res.data[0][secondReq.includeFromFirstReq.values[innerIndex]],
            })
          );
          await dynamicAxiosMethod({
            method: secondReq.method,
            endpoint: secondReq.endpoint,
            shouldToken: secondReq.endpoint,
            innerData: secondReq
              ? { ...logic[0], ...secondReq.innerData }
              : { ...secondReq.innerData },
          });
        }
        dynamicDispatch("GOOGLE_LOGIN_TOGGLE", { didGoogleLogin: false });
        clearInputs();
        endpoint.includes("login") && localStorage.setItem("token", res.data);
        toastifyHelper({ status, message });
        navigate(transferRoute);
      } catch (error) {
        error.response &&
          toastifyHelper({
            status: toastifyStatuses.error,
            message: error.response.data,
          });
      }
    }
  };

  useEffect(() => {
    const { height, times } = scrollSettings;
    container.current.scroll({
      top: height * times,
      behavior: "smooth",
    });
  }, [scrollSettings]);

  return (
    <div className={`w-[60%] gap-4 ${centerItem()} flex-col`}>
      {buttons.map((button, i) => {
        return genericIndex === 0 && i === 0 ? (
          " "
        ) : (
          <button
            className={`${
              (errors[genericIndex] &&
                Object.values(errors[genericIndex])[0].length !== 0) &
              (i === 1)
                ? "notAllowed"
                : i === 0
                ? bgColors.DENY
                : bgColors.ACCEPT
            } ${buttonStyles()} w-full rounded-2xl`}
            onClick={() => handleButtons(i)}
            key={`escalatorButton${i}`}
          >
            {Object.keys(inputs).length - 1 === genericIndex && i === 1
              ? "Submit"
              : button}
          </button>
        );
      })}
    </div>
  );
};

export default EscalatorButtons;
