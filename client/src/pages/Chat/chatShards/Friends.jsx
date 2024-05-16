import React, { useEffect, useState } from "react";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import { centerItem, gradient, grid, titleStyles } from "../../../utils/utils";
import { bgColors, gradientColors } from "../../../constants/colorsData";
import putCorrectDataForRank from "../../../helpers/putCorrectDataForRank";
import serverRoutes from "../../../constants/serverRoutes";

const Friends = ({ whichToShow, classes, userPayload, handleUserData }) => {
  const [myData, setMyData] = useState([]);

  const handleUserInteractions = (i) => {
    handleUserData((prev) => ({
      ...prev,
      i,
    }));
  };

  useEffect(() => {
    const getMyData = async () => {
      try {
        const { data } = await dynamicAxiosMethod({
          method: "get",
          endpoint: `${serverRoutes.get.getUserById}${userPayload._id}`,
          shouldToken: true,
        });
        console.log('data', data)
        const { data: friends } = await dynamicAxiosMethod({
          method: "get",
          endpoint: `${
            serverRoutes.get.getUsersWithDifferentIds
          }${data[0].Friends.join("-")}`,
          shouldToken: true,
        });
        console.log('friends', friends)
        setMyData(friends);
        handleUserData({ data: friends, i: null });
      } catch (error) {
        setMyData([]);
      }
    };
    getMyData();
  }, [whichToShow === 0]);

  return (
    <div className={`${classes}`}>
      <p
        className={`text-center ${titleStyles("text-3xl")} ${gradient(
          true,
          gradientColors.PRIMARY
        )}`}
      >
        Total: {myData?.length}
      </p>
      <div className={`grid h-[100%] my-4 grid-cols-2 ${grid()} animate-pulse`}>
        {myData?.map((data, i) => {
          return (
            <div
              onClick={() => handleUserInteractions(i)}
              className={`w-1/3 h-1/3 p-4 ${centerItem()} cursor-pointer`}
            >
              <div
                className={`h-full rotateSpace tracking-[.2rem] border-b-[1rem] ${
                  putCorrectDataForRank(data.userData.Rank).borderBottom
                } ${centerItem(
                  "justify-evenly"
                )} flex-col bg-black/50 tShadow rounded-[20px] z-20`}
              >
                {data.isAdmin && <p className={`text-red-500`}>ADMIN</p>}
                <p
                  className={`${titleStyles("text-3xl")} px-6 ${gradient(
                    true,
                    gradientColors.PRIMARY
                  )} `}
                >
                  {data.userData.Username}
                </p>
                <h1
                  className={`text-white/80 text-1xl p-2 ${bgColors.PRIMARY} w-full text-center`}
                >
                  {data.userData.Rank}
                </h1>
              </div>
              <div
                className={`w-[25%] h-[25%] m-4 ${centerItem()} absolute rounded-full ${
                  data.userData.Rank === "Star"
                    ? `shadow-[0_0_6rem_red] bg-orange-500`
                    : data.userData.Rank === "Cosmic bg-orange-500"
                    ? `shadow-[0_0_6rem_yellow] outline-dotted outline-[1.5rem] outline-offset-[3rem] outline-purple-500`
                    : "animate-spin bg-red-500/50 slowe outline-dashed  outline-[3.5rem] outline-offset-[3rem] outline-sky-500/20"
                } blur-lg`}
              >
                <div
                  style={
                    data.userData.Rank === "Star"
                      ? {
                          clipPath:
                            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                        }
                      : data.userData.Rank === "Cosmic"
                      ? {
                          clipPath: "ellipse(25% 40% at 50% 50%)",
                        }
                      : {
                          clipPath:
                            "polygon(50% 10%, 58% 38%, 73% 25%, 61% 42%, 90% 50%, 62% 58%, 74% 74%, 59% 62%, 50% 90%, 42% 62%, 26% 74%, 38% 58%, 9% 49%, 38% 42%, 26% 26%, 41% 38%)",
                        }
                  }
                  className={`w-[200%] h-[200%] drop-shadow-[0_0_4rem_white] -z-20 absolute`}
                >
                  <img
                    src={data.userData.Profile_Picture}
                    alt={data.userData.Alt}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
