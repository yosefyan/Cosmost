const feedData = {
  whichPosts: {
    top: {
      titles: ["Friends", "Global"],
      icons: ["FaUserFriends", "AiOutlineGlobal"],
    },
  },
  postsKinds: {
    titles: ["Create Post", "Create poll"],
    icons: ["BsFilePost", "FaPollH"],
  },
  whichIcons: {
    titles: ["Upload file"],
    icons: ["MdOutlineUploadFile"],
  },
  amountQuestions: Array(4).fill(""),
  userButtons: ["IoMdMegaphone", "FaBell"],
  ViewFeedDialogButtons: ["Posts", "Polls"],
  postPollBottomData: {
    titles: ["Likes", "Comments", "Shares"],
    icons: ["AiFillLike", "FaComment", "FaShare"],
  },
};

export default feedData;
