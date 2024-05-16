import React, { useEffect, useState } from "react";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import useFormValidation from "../../../hooks/useFormValidation";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import {
  bgColors,
  gradientColors,
  textColors,
} from "../../../constants/colorsData";
import ProfileNameTitle from "../../../components/ProfileNameTitle";
import repAxiosMethods from "../repAxiosMethods";
import serverRoutes from "../../../constants/serverRoutes";

const AddFriend = ({ classes, userPayload }) => {
  const [pendingFriendReq, setPendingFriendReq] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const { inputs, data } = useGenerateInputs({
    justInput: true,
    initialRequest: false,
    array: ["Username"],
    titles: ["Username"],
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Found a signal...",
    },
    eachContainer: `w-full text-6xl ${textColors.PRIMARY} h-[90%] ${centerItem(
      "justify-evenly"
    )} flex-col m-4`,
    fullContainer: "h-[30%]",
  });

  useEffect(() => {
    const checkUsername = async () => {
      try {
        if (inputs.Username !== userPayload.Username) {
          const { data } = await dynamicAxiosMethod({
            method: "get",
            shouldToken: true,
            endpoint: `${serverRoutes.get.getUserByUsername}${inputs.Username}`,
          });
          setUsersData(data);
        } else {
          setUsersData([]);
        }
      } catch (error) {
        setUsersData([]);
      }
    };
    checkUsername();
  }, [inputs]);

  useEffect(() => {
    const checkIfAdded = async () => {
      try {
        const updatedPendingReq = await repAxiosMethods();
        setPendingFriendReq(updatedPendingReq);
      } catch (error) {
        setPendingFriendReq([]);
      }
    };
    checkIfAdded();
  }, [inputs]);

  useFormValidation({
    inputs,
    specialData: {
      Username: { min: 1 },
    },
  });

  const handleAddPerson = async (data) => {
    try {
      const didSendAgain =
        pendingFriendReq &&
        pendingFriendReq?.some((req) => req.receiver === data._id);
      const areWeFriends = data.Friends.includes(userPayload._id);

      try {
        !didSendAgain &&
          !areWeFriends &&
          (await dynamicAxiosMethod({
            method: "post",
            shouldToken: true,
            endpoint: serverRoutes.post.createFriendrequest,
            innerData: {
              sender: userPayload._id,
              receiver: data._id,
              userData: {
                Rank: userPayload.Rank,
                Username: userPayload.Username,
                Profile_Picture: userPayload.Profile_Picture,
                Alt: userPayload.Alt,
              },
            },
          }));
        const updatedPendingReq = await repAxiosMethods();
        setPendingFriendReq(updatedPendingReq);
      } catch (error) {}
      toastifyHelper({
        status:
          toastifyStatuses[
            !didSendAgain && !areWeFriends ? "success" : "error"
          ],
        message:
          !didSendAgain && !areWeFriends
            ? "Sent a friend request!"
            : areWeFriends
            ? "You are already friends!"
            : "You have already sent a signal!",
      });
    } catch (error) {
      setPendingFriendReq([]);
    }
  };

  return (
    <div className={`${classes} text-white`}>
      <div className="rotateSpace transition-all slowe">{data}</div>
      <div className={`w-full h-[60%] rounded-full ${centerItem()} flex-col`}>
        {usersData.length === 0 ? (
          <>
            <IconComponent
              classes={`text-8xl text-white`}
              Icon={iconsData["MdOutlinePersonSearch"]}
            />
            <h1 className={`${titleStyles("text-4xl")}`}>
              {inputs.Username.length === 0
                ? "Type to start..."
                : "Searching..."}
            </h1>
          </>
        ) : (
          <div
            className={`w-[80%] h-full ${centerItem(
              "justify-evenly"
            )} flex-col`}
          >
            <p
              className={`w-full text-center ${titleStyles(
                "text-3xl"
              )} tShadow ${gradient(true, gradientColors.PRIMARY)}`}
            >
              Showing {usersData.length} result...
            </p>
            {usersData?.map((user, i) => {
              return (
                <div
                  className={`${centerItem()} rounded-[20px] ${
                    bgColors.SECONDARY
                  } shadow-[0_0_1rem_fuchsia]`}
                >
                  <ProfileNameTitle
                    rightSideData={" "}
                    dataType={`addFriend`}
                    data={user}
                  />
                  <IconComponent
                    onClick={() => handleAddPerson(user)}
                    classes={`text-5xl ${
                      user.Friends.includes(userPayload._id)
                        ? textColors.ACCEPT
                        : pendingFriendReq &&
                          pendingFriendReq.some(
                            (req) => req.receiver === user._id
                          )
                        ? "text-orange-500/90"
                        : textColors.TERTIARY
                    } cursor-pointer rounded-full p-4 mx-4 hover:bg-gray-500/20`}
                    Icon={
                      iconsData[
                        (pendingFriendReq &&
                          pendingFriendReq.some(
                            (req) => req.receiver === user._id
                          )) ||
                        user.Friends.includes(userPayload._id)
                          ? "FaUserCheck"
                          : "IoPersonAddSharp"
                      ]
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
