const initialState = {
  errors: {},
  toggleNav: false,
  dialogData: {
    dialogType: "",
    toggleDialog: false,
    data: null,
    neededIndex: null,
    shouldSendServer: true,
  },
  specific: false,
  axiosData: {
    method: "",
    endpoint: "",
    toastifyMessage: "",
    innerData: "",
    normalize: '',
  },
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      const { errors } = action.payload;
      return {
        ...state,
        errors,
      };
    case "TOGGLE_NAV":
      const { toggleNav } = action.payload;
      return {
        ...state,
        toggleNav,
      };
    case "OPEN_DIALOG":
      const { dialogType, data, shouldSendServer, specific } = action.payload;
      return {
        ...state,
        specific,
        dialogData: {
          ...state.dialogData,
          ...(data && { data }),
          dialogType,
          toggleDialog: true,
          shouldSendServer,
        },
      };
    case "SET_AXIOS_DATA":
      const { method, endpoint, toastifyMessage, innerData, normalize } = action.payload;
      return {
        ...state,
        axiosData: {
          ...state.axiosData,
          method: method && method,
          endpoint,
          toastifyMessage,
          innerData,
          normalize,
        },
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        dialogData: {
          dialogType: action.payload ? action.payload.dialogType : "",
          toggleDialog: false,
        },
      };
    default:
      return state;
  }
};

export default globalReducer;
