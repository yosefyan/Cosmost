import milkyWayData from "../../constants/milkyWayData";

const initialState = {
  role: "Ghost",
  userPayload: null,
  isAdmin: false,
  data: {
    rolesData: [
      ...milkyWayData.roles.Ghost.titles,
      ...milkyWayData.roles.Always.titles,
    ],
    iconsData: [
      ...milkyWayData.roles.Ghost.icons,
      ...milkyWayData.roles.Always.icons,
    ],
    bgs: [...milkyWayData.roles.Ghost.bgs, ...milkyWayData.roles.Always.bgs],
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_INIT":
      const { data, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
        data: {
          rolesData: [...milkyWayData.roles.Always.titles, ...data.rolesData],
          iconsData: [...milkyWayData.roles.Always.icons, ...data.iconsData],
        },
      };

    default:
      return state;
  }
};

export default authReducer;
