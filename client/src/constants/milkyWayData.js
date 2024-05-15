import Login from "../assets/bgPages/Login.png";

const milkyWayData = {
  roles: {
    Always: {
      titles: ["Shop", "Feed", "About"],
      icons: ["FaShoppingCart", "BsFilePost", "IoInformationCircleSharp"],
      bgs: ["", "", ""],
    },
    loggedIn: {
      titles: ["Profile", "Chat", "Feasts"],
      icons: ["AiFillProfile", "LuMessagesSquare", "GiOpenTreasureChest"],
      bgs: ["", ""],
    },
    Ghost: {
      titles: ["Login", "Register"],
      icons: ["IoMdLogIn", "FaRegistered"],
      bgs: [Login, ""],
    },
    Admin: {
      titles: ["CRM", "Leaderboards"],
      icons: ["SiCivicrm", "MdLeaderboard"],
      bgs: ["", ""],
    },
  },
  positions: {
    textPositions: [
      "top-[10rem] left-[5rem]",
      "top-[48rem] left-[-2rem]",
      "top-[-5rem] left-[36rem]",
      "top-[22rem] left-[68rem]",
      "top-[55rem] left-[63rem]",
      "top-[69rem] left-[30rem]",
    ],
    dotPositions: [
      "top-[21rem] left-[10rem]",
      "top-[50rem] left-[13rem]",
      "top-[8rem] left-[35rem]",
      "top-[22rem] left-[60rem]",
      "top-[48rem] left-[60rem]",
      "top-[60rem] left-[38rem]",
    ],
  },
  bgCircles: Array(6).fill(""),
};

export default milkyWayData;
