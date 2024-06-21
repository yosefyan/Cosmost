import React, { useEffect, useState } from "react";
import FeedDialogFormat from "./FeedDialogFormat";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import { useSelector } from "react-redux";
import { centerItem, titleStyles } from "../../../utils/utils";
import { bgColors } from "../../../constants/colorsData";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import Page404 from "../../../components/Page404";
import serverRoutes from "../../../constants/serverRoutes";

const NotificationsData = ({ handleSpecificClose }) => {
  const { userPayload } = useSelector((state) => state.authReducer);
  const [notificationsData, setNotificationsData] = useState(null);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await dynamicAxiosMethod({
          method: "get",
          endpoint: `${serverRoutes.get.getNotificationById}${userPayload._id}`,
        });
        setNotificationsData(data);
      } catch (error) {
        setNotificationsData([]);
      }
    };
    getNotifications();
  }, []);

  const htmlData = (
    <div className={`w-full overflow-y-auto flex-col`}>
      {notificationsData?.length > 0 ? (
        notificationsData?.map((noti, i) => {
          const whichAction = noti.Message.includes("liked")
            ? "like"
            : noti.Message.includes("comment")
            ? "comment"
            : "share";
          const date = new Date(noti.createdAt);
          const hours = date.getHours() % 24 || 12;
          return (
            <div
              key={`notiMessageNotificationsData${i}`}
              className={`w-[80%] h-[30%] ${
                whichAction === "like"
                  ? "border-b-red-500"
                  : whichAction === "comment"
                  ? "border-b-500"
                  : "border-b-yellow-500"
              } border-b-8 border-b-blue-500 m-auto my-8 ${
                i % 2 === 0 ? bgColors.PRIMARY : bgColors.SECONDARY
              } ${centerItem(
                "justify-between"
              )} shadow-[0_0_1.5rem_black] rounded-[30px]  p-4`}
            >
              <img
                className={`w-[10%] h-fit rounded-full`}
                src={noti.image.Upload}
                alt={noti.image.Alt}
              />
              <IconComponent
                classes={"text-3xl text-white/50"}
                Icon={
                  iconsData[
                    whichAction === "like"
                      ? "AiFillLike"
                      : whichAction === "comment"
                      ? "FaComment"
                      : "FaShare"
                  ]
                }
              />
              <h1
                className={`${titleStyles(
                  "text-[1.2rem]"
                )} tShadow text-white/50`}
              >
                {noti.Message}
              </h1>
              <div
                className={` rounded-[20px] bg-black/50 w-[20%] h-full ${centerItem(
                  "justify-evenly"
                )} flex-col`}
              >
                <IconComponent
                  classes={`text-4xl`}
                  Icon={iconsData["FaClock"]}
                />
                <p className={`${titleStyles("text-1xl")}`}>
                  {hours < 10 ? "0" + hours : hours}:
                  {date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes()}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <Page404 />
      )}
    </div>
  );

  return (
    <FeedDialogFormat
      toastifyData={{
        message: "Loaded post succesfully!",
        status: toastifyStatuses.success,
      }}
      height={`h-[50vh]`}
      title={"Notification"}
      onlyTitle
      handleSpecificClose={handleSpecificClose}
      endpoint={"NotificationsData"}
      htmlData={htmlData}
      normalize={"Post"}
    />
  );
};

export default NotificationsData;
