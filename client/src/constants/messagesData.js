import AddFriend from "../pages/Chat/chatShards/AddFriend";
import FriendRequests from "../pages/Chat/chatShards/FriendRequests";
import Friends from "../pages/Chat/chatShards/Friends";

const messagesData = {
  topIcons: {
    icons: ["FaUserFriends", "GiPsychicWaves", "RiUserSearchFill"],
    titles: ["Friend list", "Friend requests", "Search a friend"],
  },
  componentsData: [Friends, FriendRequests, AddFriend],
  screenParts: Array(3).fill(''),
};

export default messagesData;
