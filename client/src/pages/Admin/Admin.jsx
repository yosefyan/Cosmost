import React, { useEffect, useState } from "react";
import PortalNav from "../../components/PortalNav";
import { centerItem, gradient, titleStyles } from "../../utils/utils";
import InfoSquare from "./adminShards/InfoSquare";
import dynamicAxiosMethod from "../../helpers/dynamicAxiosMethod";
import serverRoutes from "../../constants/serverRoutes";
import {
  gradientColors,
  textColors,
} from "../../constants/colorsData";
import ProfileNameTitle from "../../components/ProfileNameTitle";
import useInitLogin from "../../hooks/useInitLogin";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    try {
      const getAllUsers = async () => {
        const res = await dynamicAxiosMethod({
          method: "get",
          endpoint: serverRoutes.get.getAllUsers,
          shouldToken: true,
        });
        setAllUsers(res.data);
      };
      getAllUsers();
    } catch (error) {
      
    }
  }, []);

  return (
    <div
      className={`w-full h-full lg:w-[100vw] lg:h-[100vh] bg-black bg-stars-pattern flex-col lg:flex-row ${centerItem(
        "justify-evenly"
      )}`}
    >
      <PortalNav />
      <div className={`w-[75%] h-full flex-col lg:flex-row ${centerItem()}`}>
        <div className={`w-full lg:w-[40%] h-full`}>
          <InfoSquare
            serverData={allUsers}
            data={{
              title: "Users-Admins",
              shouldSplit: true,
              firstColor: {
                tailwind: "text-sky-500/50",
                chart: "rgba(14, 165, 233, 0.5)",
              },
              secondColor: {
                tailwind: "text-red-500/50",
                chart: "rgba(239, 68, 68, 0.5)",
              },
              whatToShow: "userAdmin",
            }}
          />
          <InfoSquare
            serverData={allUsers}
            data={{
              title: "Coins-Gems",
              shouldSplit: true,
              firstColor: {
                tailwind: "text-orange-500/50",
                chart: "rgba(255, 165, 0, 0.5)",
              },
              secondColor: {
                tailwind: "text-green-500/50",
                chart: "rgba(144, 238, 144, 0.5)",
              },
              whatToShow: "coinsGems",
            }}
          />
        </div>
        <div className={`w-full lg:w-[60%] relative h-full p-4`}>
          <h1
            className={`${titleStyles("text-7xl")} tShadow p-4 fly ${gradient(
              true,
              gradientColors.PRIMARY
            )}`}
          >
            Users
          </h1>
          {allUsers?.map((user, i) => {
            return (
              <ProfileNameTitle
                endpoint={{
                  delete: `${`/users/deleteUser/${user._id}`} `,
                  patch: `${`/users/patchUsername/${user._id}`}`,
                }}
                normalize={"EditUsername"}
                index={i}
                data={user}
                neededIndex={2}
                dataType={"updateUser"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
