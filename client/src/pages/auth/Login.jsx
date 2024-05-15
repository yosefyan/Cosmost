import React from "react";
import { centerItem, gradient, titleStyles } from "../../utils/utils";
import { gradientColors, textColors } from "../../constants/colorsData";
import useGenerateInputs from "../../hooks/useGenerateInputs";
import IconComponent from "../../components/IconComponent";
import * as iconsData from "../../constants/iconsData";
import NavigateComponent from "../../components/NavigateComponent";
import useFormValidation from "../../hooks/useFormValidation";
import { emailPasswordSettings } from "../../constants/validationData";
import PortalNav from "../../components/PortalNav";
import { toastifyStatuses } from "../../helpers/toastifyHelper";

const Login = () => {
  const { inputs, data } = useGenerateInputs({
    array: ["Email", "Password"],
    titles: ["Let's go on,", "Click on the hash to reveal/hide."],
    submitRequest: {
      method: "post",
      api: "local",
      endpoint: "/users/login",
      shouldNorm: false,
    },
    initialRequest: false,
    transferRoute: "/",
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Login succesful!",
    },
    fullContainer: `${centerItem(
      "",
      ""
    )} w-1/2 grid grid-cols-1 flex-col h-[100vh] lg:h-full`,
    eachContainer: `w-full min-h-[100vh] ${centerItem(
      "justify-evenly"
    )} flex-col`,
  });

  useFormValidation({
    inputs,
    specialData: {
      ...emailPasswordSettings,
      Username: { min: 1 },
    },
  });

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5174/auth/google";
  };

  return (
    <div
      className={`w-[100vw] h-initial lg:h-[100vh] flex-col-reverse lg:flex-row ${centerItem()} bgGradientLogin overflow-hidden`}
    >
      {data}
      <section
        className={`w-full  h-full ${centerItem(
          "justify-evenly"
        )} flex-col rotateSpace`}
      >
        <NavigateComponent
          message={`Don't have an account?`}
          name={"Register"}
        />
        <h1
          className={`${titleStyles("text-6xl")} ${gradient(
            true,
            gradientColors.SECONDARY
          )}`}
        >
          Login
        </h1>
        <h3 className={`h-full lg:h-[0] my-8 lg:my-0 lg:p-4 ${titleStyles("text-1xl lg:text-4xl")} ${textColors.TERTIARY}`}>
          You are just one mile away.
        </h3>
        <div className={`cursor-pointer w-full h-[50%] relative`}>
          <div className="w-full h-full bg-black blur-xl absolute -z-20"></div>
          <div
            onClick={handleGoogleLogin}
            className={`z-20 hover:scale-95 h-[60vh] lg:h-full rounded-full transition-all ${centerItem(
              "justify-evenly"
            )} flex-col`}
          >
            <h1
              className={`select-none leading-10 flex-col ${titleStyles(
                "text-4xl"
              )} ${centerItem()} ${textColors.PRIMARY}`}
            >
              Login via
              <span
                className={`p-8 ${titleStyles("text-6xl")} ${gradient(
                  true,
                  gradientColors.PRIMARY
                )}`}
              >
                Google
              </span>
            </h1>
            <IconComponent
              classes={`w-fit rounded-full absolute blur-[6rem] callAnimation -z-20 rotateSpace h-[50%] ${centerItem()} ${titleStyles(
                "text-[20rem]"
              )} transition-all drop-shadow-[0_0_.7rem_black]`}
              Icon={iconsData["FcGoogle"]}
            />
          </div>
        </div>
      </section>
      <PortalNav />
    </div>
  );
};

export default Login;
