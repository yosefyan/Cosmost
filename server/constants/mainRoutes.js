import dynamicUsersMethods from "../routes/api/dynamicUsersMethods.js";
import dynamicPostMethods from "../routes/api/dynamicPostMethods.js";
import dynamicAuthMethods from "../routes/api/dynamicAuthMethods.js";
import dynamicPollsMethods from "../routes/api/dynamicPollsMethods.js";
import dynamicCommentsMethods from "../routes/api/dynamicCommentsMethods.js";
import dynamicNotificationsMethod from "../routes/api/dynamicNotificationsMethods.js";
import dynamicFriendRequestsMethod from "../routes/api/dynamicFriendRequestsMethods.js";
import dynamicMessagesRequestsMethod from "../routes/api/dynamicMessagesRequestsMethods.js";
import dynamicRoomsMethods from "../routes/api/dynamicRoomsMethods.js";

const mainApiRoutes = {
  urls: [
    "/users",
    "/posts",
    "/polls",
    "/comments",
    "/notifications",
    "/friendrequests",
    "/messages",
    "/rooms",
  ],
  files: [
    dynamicUsersMethods,
    dynamicPostMethods,
    dynamicPollsMethods,
    dynamicCommentsMethods,
    dynamicNotificationsMethod,
    dynamicFriendRequestsMethod,
    dynamicMessagesRequestsMethod,
    dynamicRoomsMethods,
  ],
};

const mainAuthRoutes = {
  urls: ["/"],
  files: [
    dynamicAuthMethods,
  ],
};

export { mainApiRoutes, mainAuthRoutes };
