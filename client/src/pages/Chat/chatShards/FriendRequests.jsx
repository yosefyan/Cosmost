import React, { useEffect, useState } from "react";
import repAxiosMethods from "../repAxiosMethods";
import ProfileNameTitle from "../../../components/ProfileNameTitle";
import Page404 from "../../../components/Page404";
import { centerItem, gradient, titleStyles } from "../../../utils/utils";
import { gradientColors, textColors } from "../../../constants/colorsData";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import areYouSureData from "../../../constants/areYouSureData";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";
import serverRoutes from "../../../constants/serverRoutes";

const FriendRequests = ({ classes, whichToShow }) => {
  const [pendingData, setPendingData] = useState([]);
  const [acceptDenyTrigger, setAcceptDenyTrigger] = useState(false);

  useEffect(() => {
    const checkFriendRequests = async () => {
      try {
        const updatedPendingReq = await repAxiosMethods("receiver");
        setPendingData(updatedPendingReq);
      } catch (error) {
        setPendingData([]);
      }
    };
    checkFriendRequests();
  }, [whichToShow === 1, acceptDenyTrigger]);

  const handleAcceptDeny = async (i, da) => {
    try {
      await dynamicAxiosMethod({
        method: "delete",
        endpoint: `${serverRoutes.delete.deleteFriendrequest}${da._id}`,
        shouldToken: true,
      });
      await dynamicAxiosMethod({
        method: "patch",
        endpoint: `${serverRoutes.patch.addUser}${da.sender}`,
        shouldToken: true,
      });
      toastifyHelper({
        status: toastifyStatuses.success,
        message:
          i === 0
            ? "Ignored request succesfully!"
            : "Added friend succesfully!",
      });
      setAcceptDenyTrigger((prevState) => !prevState);
    } catch (error) {}
  };

  const htmlData = (da) => (
    <div className={`flex-1 h-full ${centerItem("justify-end")}`}>
      {areYouSureData.icons.map((icon, i) => {
        return (
          <React.Fragment key={`areYouSureDataIconsFriendRequests${i}`}>
            <IconComponent
              onClick={() => handleAcceptDeny(i, da)}
              classes={`text-5xl p-4 hover:bg-gray-500/10 rounded-full cursor-pointer text-end ${
                textColors[i === 0 ? "DENY" : "ACCEPT"]
              }`}
              Icon={iconsData[icon]}
            />
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div
      className={`${classes} bg-hero-pattern bg-[length:100%_100%] overflow-y-auto ${centerItem()} flex-col`}
    >
      <p
        className={`${titleStyles("text-2xl")} p-4 ${gradient(
          true,
          gradientColors.PRIMARY
        )}`}
      >
        You have {pendingData?.length} pending request/s!
      </p>
      {pendingData?.length > 0 ? (
        pendingData?.map((da, i) => {
          return (
            <div
              key={`pendingDataFriendRequests${i}`}
              className={`w-full h-full bg-black/50 ${centerItem(
                "justify-evenly"
              )} flex-col`}
            >
              <ProfileNameTitle
                dataType={"friendRequest"}
                rightSideData={htmlData(da)}
                data={da}
              />
            </div>
          );
        })
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default FriendRequests;
