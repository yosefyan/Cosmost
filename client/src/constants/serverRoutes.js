const repetitiveRoutes = {
  postsDefault: "/posts/",
  usersDefault: "/users/",
  commentsDefault: "/comments/",
  notificationsDefault: "/notifications/",
  friendrequestsDefault: "/friendrequests/",
  roomsDefault: "/rooms/",
  messageDefault: "/messages/",
  authUsersDefault: "/",
};

const {
  postsDefault,
  usersDefault,
  commentsDefault,
  notificationsDefault,
  friendrequestsDefault,
  roomsDefault,
  messageDefault,
  authUsersDefault
} = repetitiveRoutes;

const serverRoutes = {
  get: {
    getAuthUserById: `${authUsersDefault}getAuthUserById/`,
    getMyPosts: `${postsDefault}my-posts`,
    getUserById: `${usersDefault}getUserById/`,
    getUserByUsername: `${usersDefault}getUserByUsername/`,
    getUsersWithDifferentIds: `${usersDefault}getUsersWithDifferentIds/`,
    getPostById: postsDefault,
    getAllUsers: `${usersDefault}getAllUsers`,
    getCommentById: `${commentsDefault}getCommentById/`,
    getNotificationById: `${notificationsDefault}getNotificationsById/`,
    getAllMyFriendrequests: `${friendrequestsDefault}getAllMyFriendrequests`,
    getRoomById: `${roomsDefault}getRoomById/`,
    getMessageById: `${messageDefault}getMessageById/`,
  },
  post: {
    login: `${usersDefault}/login`,
    register: usersDefault,
    createNewPost: postsDefault,
    createComment: `${commentsDefault}createComment`,
    createFriendrequest: `${friendrequestsDefault}createFriendrequest`,
    createNotification: `${notificationsDefault}createNotification`,
    createRoom: `${roomsDefault}createRoom`,
    createMessage: `${messageDefault}createMessage`,
  },
  put: {
    updateMoney: `${usersDefault}updateMoney`,
    updateOwnStuff: `${usersDefault}updateOwnStuff`,
  },
  patch: {
    likePost: postsDefault,
    changeStatus: usersDefault,
    addUser: `${usersDefault}addUser/`,
  },
  delete: {
    deletePost: postsDefault,
    deleteUser: usersDefault,
    deleteFriendrequest: `${friendrequestsDefault}deleteFriendrequest/`,
  },
};

export default serverRoutes;
