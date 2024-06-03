import React, { useEffect } from "react";
import MilkyWay from "./homeShards/MilkyWay";
import { centerItem, gradient, titleStyles } from "../../utils/utils";
import Settings from "../../components/Settings";
import { useSelector } from "react-redux";
import IconComponent from "../../components/IconComponent";
import * as iconsData from "../../constants/iconsData";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../constants/colorsData";
import { useNavigate } from "react-router-dom";
import useInitLogin from "../../hooks/useInitLogin";

const Home = () => {
  const navigate = useNavigate();
  const { finishedLoading } = useInitLogin();
  const { userPayload } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const didGoogleLogin = localStorage.getItem("didGoogleLogin");
    const token = localStorage.getItem("token");
    console.log(didGoogleLogin, token)
    if (!token && didGoogleLogin) {
      localStorage.removeItem("didGoogleLogin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("didGoogleLogin");
    navigate("/login");
  };

  return (
    <div
      className={`overflow-scroll lg:overflow-hidden bg-black relative w-[100vw] ${centerItem()} flex-col`}
    >
      <Settings />
      <div
        className={`w-full h-full overflow-scroll lg:overflow-hidden absolute bg-stars-pattern opacity-50`}
      ></div>
      {userPayload && finishedLoading && (
        <div
          onClick={handleLogout}
          className={`${bgColors.SECONDARY} ${centerItem()} ${titleStyles(
            "text-3xl"
          )} absolute p-4 m-4 z-20 rounded-full gap-4 cursor-pointer hover:scale-95 transition-all top-[0%] lg:top-[40%] shadow-lg shadow-cyan-500/40 left-0 w-full lg:w-[20%] h-fit`}
        >
          <IconComponent
            classes={`${textColors.PRIMARY}`}
            Icon={iconsData["RiAdminLine"]}
          />
          <h1 className={` ${gradient(true, gradientColors.PRIMARY)}`}>
            LOGOUT
          </h1>
        </div>
      )}
      {userPayload && userPayload.isAdmin && (
        <div
          onClick={() => navigate("/admin")}
          className={`w-[20vw] h-fit cursor-pointer hover:scale-95 transition-all absolute top-0 right-0 m-4 p-4`}
        >
          <div
            className={`w-full h-[25%] shadow-lg shadow-fuchsia-500/40 rounded-full ${
              bgColors.PRIMARY
            } p-4 ${centerItem()} gap-4 ${titleStyles("text-2xl")}`}
          >
            <IconComponent
              classes={`${textColors.PRIMARY}`}
              Icon={iconsData["RiAdminLine"]}
            />
            <h1 className={`${gradient(true, gradientColors.PRIMARY)}`}>CRM</h1>
          </div>
        </div>
      )}
      <MilkyWay />
    </div>
  );
};

export default Home;
