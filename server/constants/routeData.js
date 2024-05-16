import {
  createData,
  deleteData,
  getData,
  updateData,
} from "../models/dynamicAdapter/dbAdapter.js";
import {
  postValidationAdapter,
  loginValidationAdapter,
  userValidationAdapter,
} from "../validation/validationAdapter.js";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import Posts from "../models/MongoDB/Collections/Schemas/Posts.js";
import Polls from "../models/MongoDB/Collections/Schemas/Polls.js";
import Comments from "../models/MongoDB/Collections/Schemas/Comments.js";
import registerUser from "../controllers/registerUser.js";
import loginUser from "../controllers/loginUser.js";
import dynamicRoleMiddleware from "../middlewares/dynamicRoleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import paramsMiddleware from "../middlewares/paramsMiddleware.js";
import bodyMiddleware from "../middlewares/reqDataMiddlewares/bodyMiddleware.js";
import middlewaresFormat from "./middlewareFormats.js";
import limitUser from "../helpers/limitUser.js";
import passport from "passport";
import postInteraction from "../controllers/likePost.js";
import Notifications from "../models/MongoDB/Collections/Schemas/Notifications.js";
import friendRequests from "../models/MongoDB/Collections/Schemas/FriendRequests.js";
import matchingDataFromDifferentIds from "../controllers/matchingDataFromDifferentIds.js";
import Messages from "../models/MongoDB/Collections/Schemas/Messages.js";
import Rooms from "../models/MongoDB/Collections/Schemas/Rooms.js";
import { generateToken } from "../helpers/tokenServices.js";
import envAdapter from "../helpers/envAdapter.js";

envAdapter();

const { SOCKET_ORIGIN } = process.env;

const usersRouteData = {
  get: {
    urls: [
      "/getAllUsers",
      "/getUserById/:id",
      "/getUserByUsername/:username",
      "/getUsersWithDifferentIds/:ids",
    ],
    bodyRequest: [
      [authMiddleware, dynamicRoleMiddleware(["isAdmin"], User), getData(User)],
      [authMiddleware, paramsMiddleware, getData(User, "_id")],
      [authMiddleware, paramsMiddleware, getData(User, "userData.Username")],
      [
        matchingDataFromDifferentIds(User, "_id", {
          userData: 1,
          isAdmin: 1,
          _id: 1,
        }),
      ],
    ],
  },
  post: {
    urls: ["/register", "/login", "registerAuth"],
    bodyRequest: [
      [bodyMiddleware(userValidationAdapter, true, true), registerUser],
      [bodyMiddleware(loginValidationAdapter), limitUser, loginUser],
    ],
  },
  patch: {
    urls: ["/patchUsername/:id", "/addUser/:id", "/patchUser/:id"],
    bodyRequest: [
      [
        ...middlewaresFormat(User).paramsAdminMiddleware,
        bodyMiddleware(userValidationAdapter, false, true, false, true),
        updateData(User, true),
      ],
      [authMiddleware, paramsMiddleware, postInteraction(User, "Friends")],
      [
        ...middlewaresFormat(User).paramsAdminMiddleware,
        updateData(User, true),
      ],
    ],
  },
  put: {
    urls: ["/updateMoney", "/updateOwnStuff"],
    bodyRequest: [
      [
        authMiddleware,
        bodyMiddleware(postValidationAdapter, false, "updateMoney"),
        updateData(User, true),
      ],
      [
        authMiddleware,
        bodyMiddleware(postValidationAdapter, false, "updateOwnStuff"),
        updateData(User, true),
      ],
    ],
  },
  delete: {
    urls: ["/deleteUser/:id"],
    bodyRequest: [
      [...middlewaresFormat(User).paramsAdminMiddleware, deleteData(User)],
    ],
  },
};

const differentSchemas = [
  Posts,
  Polls,
  Comments,
  friendRequests,
  Messages,
  Rooms,
];
const pollsPostsRouteData = differentSchemas.map((schema, i) => {
  const dynamicValidation = ["updatePost", "updatePoll", "updateComment"];
  const userIdAndSharedData = ["user_id", "user_id", "post_id", "sender"];
  let strVersion = schema.modelName.toString();
  const PostsOrPollsWithS = strVersion[0].toUpperCase() + strVersion.slice(1);
  const PostOrPollWithoutS = PostsOrPollsWithS.slice(
    0,
    PostsOrPollsWithS.length - 1
  );
  return {
    get: {
      urls: [
        `/getAll${PostsOrPollsWithS}`,
        `/get${PostOrPollWithoutS}ById/:id${i === 5 || i === 4 ? "s" : ""}`,
        `/getAllMy${PostsOrPollsWithS}`,
      ],
      bodyRequest: [
        [getData(schema)],
        i !== 5 && i !== 4
          ? [
              authMiddleware,
              paramsMiddleware,
              getData(schema, i !== 2 ? "_id" : "post_id"),
            ]
          : [
              authMiddleware,
              i !== 4 && i !== 5
                ? paramsMiddleware
                : (req, res, next) => next(),
              matchingDataFromDifferentIds(
                i === 5 ? Rooms : Messages,
                i === 5 ? "roomId" : "messageId",
                i === 5
                  ? { roomId: 1 }
                  : { Message: 1, sender: 1, createdAt: 1 },
                false
              ),
            ],
        [authMiddleware, getData(schema, userIdAndSharedData[i])],
      ],
    },
    post: {
      urls: [`/create${PostOrPollWithoutS}`],
      bodyRequest: [
        [
          authMiddleware,
          bodyMiddleware(postValidationAdapter, false, strVersion),
          createData(schema),
        ],
      ],
    },
    patch: {
      urls: [
        `/like${PostOrPollWithoutS}/:id`,
        `/share${PostOrPollWithoutS}/:id`,
        `/update${PostOrPollWithoutS}/:id`,
      ],
      bodyRequest: [
        [authMiddleware, paramsMiddleware, postInteraction(schema, "Likes")],
        [
          authMiddleware,
          paramsMiddleware,
          postInteraction(schema, "peopleShared"),
        ],
        [
          ...middlewaresFormat(schema).paramsAdminMiddleware,
          bodyMiddleware(postValidationAdapter, false, dynamicValidation[i]),
          updateData(schema, true),
        ],
      ],
    },
    delete: {
      urls: [`/delete${PostOrPollWithoutS}/:id`],
      bodyRequest: [
        i !== 3
          ? [
              ...middlewaresFormat(schema).paramsAdminMiddleware,
              deleteData(schema),
            ]
          : [authMiddleware, paramsMiddleware, deleteData(schema)],
      ],
    },
  };
});

const [
  postsRouteData,
  pollsRouteData,
  commentsRouteData,
  friendRequestsData,
  messagesRouteData,
  roomsRouteData,
] = pollsPostsRouteData;

const notificationsRouteData = {
  get: {
    urls: [`/getNotificationsById/:id`],
    bodyRequest: [[paramsMiddleware, getData(Notifications, "originalOwner")]],
  },
  post: {
    urls: [`/createNotification`],
    bodyRequest: [
      [
        authMiddleware,
        bodyMiddleware(postValidationAdapter, false, "notifications"),
        createData(Notifications),
      ],
    ],
  },
  delete: {
    urls: [`/deleteNotification/:id`],
    bodyRequest: [
      [
        ...middlewaresFormat(Notifications).paramsAdminMiddleware,
        deleteData(Notifications),
      ],
    ],
  },
};
const authRouteData = {
  get: {
    urls: ["/google", "/google/callback", "/success", "/failure"],
    bodyRequest: [
      [passport.authenticate("google", { scope: ["profile", "email"] })],
      [
        passport.authenticate("google", {
          successRedirect: SOCKET_ORIGIN,
          failureRedirect: "/login",
        }),
      ],
      [
        async (req, res) => {
          req.authData = req.sessionStore.sessions;
          const result = Object.values(req.sessionStore.sessions).map((res) => {
            const sessionData = JSON.parse(res);
            return sessionData.passport;
          });

          const user = (await result[0]?.user) || (await result[1]?.user);

          if (user) {
            const { _id, isAdmin, userData, moneyData, ownedStuff } =
              result[0]?.user;
            const { Profile_Picture, Alt, Rank, Username } = userData;

            const generatedToken = await generateToken({
              _id,
              isAdmin,
              Rank,
              Username,
              Profile_Picture,
              Alt,
              moneyData,
              ownedStuff,
            });
            return res.json(generatedToken);
          }
        },
      ],
      [(req, res) => res.send("Login failed!")],
    ],
  },
};

export {
  usersRouteData,
  postsRouteData,
  pollsRouteData,
  commentsRouteData,
  friendRequestsData,
  authRouteData,
  notificationsRouteData,
  messagesRouteData,
  roomsRouteData,
};
