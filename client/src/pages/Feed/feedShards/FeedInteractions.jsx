import React, { useEffect, useState } from "react";
import { centerItem, titleStyles } from "../../../utils/utils";
import feedData from "../../../constants/feedData";
import * as iconsData from "../../../constants/iconsData";
import IconComponent from "../../../components/IconComponent";
import { rarityColors, textColors } from "../../../constants/colorsData";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import { useSelector } from "react-redux";
import putMatchingNotification from "../../../helpers/putMatchingNotification";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";
import getRandomNumber from "../../../helpers/getRandomNumber";
import serverRoutes from "../../../constants/serverRoutes";

const FeedInteractions = ({
  data,
  postKind,
  handleComment,
  shouldOnlyLike = false,
  commentsLength,
}) => {
  const colorsPostsLogic = (i) =>
    rarityColors[i === 0 ? "RARE" : i === 1 ? "LEGENDARY" : "COMMON"];
  const { userPayload } = useSelector((state) => state.authReducer);
  const [interactiveButton, setInteractiveButton] = useState({
    Likes: data.Likes.includes(userPayload._id),
    ...(!shouldOnlyLike && {
      peopleShared: data.peopleShared.includes(userPayload._id),
    }),
  });
  const [interactiveNumbers, setInteractiveNumbers] = useState({
    Likes: {
      shouldIncrease: !data.Likes.includes(userPayload._id),
      amount: data.Likes.length,
    },
    Comments: {
      amount: commentsLength || "🗨",
    },
    ...(!shouldOnlyLike && {
      Shares: {
        shouldIncrease: !data.peopleShared.includes(userPayload._id),
        amount: data.peopleShared.length,
      },
    }),
  });

  useEffect(() => {
    setInteractiveNumbers((prev) => ({
      ...prev,
      Comments: {
        amount: prev.Comments.amount,
      },
    }));
  }, [commentsLength]);

  const neededArray = (subObj) =>
    shouldOnlyLike
      ? feedData.postPollBottomData[subObj].filter((_, i) => i < 1)
      : feedData.postPollBottomData[subObj];

  const handleIconFeed = async (i) => {
    setInteractiveNumbers((prev) => ({
      ...prev,
      ...(i === 0
        ? {
            Likes: prev.Likes.shouldIncrease
              ? {
                  shouldIncrease: false,
                  amount:
                    data.Likes.length <= prev.Likes.amount
                      ? data.Likes.length + 1
                      : data.Likes.length,
                }
              : {
                  shouldIncrease: true,
                  amount:
                    data.Likes.length < prev.Likes.amount
                      ? data.Likes.length
                      : data.Likes.length - 1,
                },
          }
        : !shouldOnlyLike &&
          i === 2 && {
            Shares: prev.Shares.shouldIncrease
              ? {
                  shouldIncrease: false,
                  amount:
                    data.peopleShared.length <= prev.Shares.amount
                      ? data.peopleShared.length + 1
                      : data.peopleShared.length,
                }
              : {
                  shouldIncrease: true,
                  amount:
                    data.peopleShared.length < prev.Shares.amount
                      ? data.peopleShared.length
                      : data.peopleShared.length - 1,
                },
          }),
    }));
    try {
      const randomCoins = getRandomNumber(750, 200);
      const randomGems = getRandomNumber(300, 50);
      const userFromServer = await dynamicAxiosMethod({
        method: "get",
        endpoint: `${serverRoutes.get.getUserById}${userPayload._id}`,
        shouldToken: true,
      });
      if (i !== 1) {
        await dynamicAxiosMethod({
          method: "put",
          endpoint: `${serverRoutes.put.updateMoney}`,
          shouldToken: true,
          innerData: {
            moneyData: {
              coins: +userFromServer.data[0].moneyData.coins + randomCoins,
              gems: +userFromServer.data[0].moneyData.gems + randomGems,
            },
          },
        });
        toastifyHelper({
          status: toastifyStatuses.success,
          message: `You have got ${randomCoins} coins and ${randomGems} gems to use in Shop.`,
        });
      }
      const { _id, Likes, Shares, peopleShared, Textarea, user_id, ...rest } =
        data;
      setInteractiveButton((prev) => ({
        ...prev,
        [i === 0 ? "Likes" : i === 2 ? "peopleShared" : "Comments"]:
          !prev[i === 0 ? "Likes" : i === 2 ? "peopleShared" : "Comments"],
      }));
      if (i !== 1) {
        await dynamicAxiosMethod({
          method: "patch",
          endpoint: `${postKind.toLowerCase()}s/${
            i === 0 ? "like" : "share"
          }${postKind}/${data._id}`,
        });
        toastifyHelper({
          status: toastifyStatuses.success,
          message: `${
            i === 0
              ? `${!interactiveNumbers.Likes.shouldIncrease ? "Un" : ""}liked`
              : `${!interactiveNumbers.Shares.shouldIncrease ? "Un" : ""}shared`
          } succesfully!`,
        });
        data.user_id !== userPayload._id &&
          (await dynamicAxiosMethod({
            shouldToken: true,
            method: "post",
            endpoint: serverRoutes.post.createNotification,
            innerData: {
              ...rest,
              originalOwner: data.user_id,
              Message: `${userPayload.Username} has ${
                i === 0
                  ? `${putMatchingNotification(
                      interactiveNumbers.Likes.shouldIncrease,
                      ""
                    )}liked`
                  : i === 1
                  ? `${putMatchingNotification(
                      interactiveNumbers.Comments.shouldIncrease,
                      ""
                    )}commented on`
                  : `${putMatchingNotification(
                      interactiveNumbers.Shares.shouldIncrease,
                      ""
                    )}shared`
              } your ${postKind.toLowerCase()}.`,
            },
          }));
      }
    } catch (error) {
      error.response &&
        toastifyHelper({
          status: toastifyStatuses.error,
          message: error.response,
        });
      setInteractiveButton({
        Likes: !interactiveButton.Likes,
        peopleShared: !interactiveButton.peopleShared,
      });
      throw error;
    }
  };

  return (
    <div
      className={`${centerItem("justify-between")} w-[90%] h-[20%] text-start`}
    >
      <div className={`${centerItem()}`}>
        {neededArray("icons").map((icon, i) => {
          return (
            <React.Fragment key={`postPollBottomIcons${i}`}>
              <IconComponent
                onClick={() => {
                  handleIconFeed(i);
                  handleComment(i);
                }}
                classes={`${
                  interactiveButton[i === 0 ? "Likes" : "peopleShared"]
                    ? textColors[i === 0 ? "DENY" : i === 2 && "ACCEPT"]
                    : "text-white"
                } p-4 cursor-pointer hover:bg-gray-500/20 rounded-[20px]`}
                Icon={iconsData[icon]}
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className={`${centerItem()} gap-4`}>
        {neededArray("titles").map((title, i) => {
          const neededNumber =
            interactiveNumbers[title] && interactiveNumbers[title].amount;
          return (
            <React.Fragment key={`postPollBottomTitles${i}`}>
              <p
                className={`${titleStyles(
                  "text-[.7rem]"
                )} tShadow ${colorsPostsLogic(i)}`}
              >
                {neededNumber}{" "}
                {neededNumber === 1 ? title.slice(0, title.length - 1) : title}
              </p>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FeedInteractions;
