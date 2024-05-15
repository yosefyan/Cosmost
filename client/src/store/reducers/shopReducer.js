const initialState = {
  currentShopData: {
    leftPart: {},
    topPart: {},
    bottomPart: {},
  },
  moneyData: {
    coins: 0,
    gems: 0,
  },
  totalSum: {
    coins: 0,
    gems: 0,
  },
  ownedStuff: {
    ranks: [],
    pets: [],
    titles: [],
  },
  cartData: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      const { currentShopData } = action.payload;
      return {
        ...state,
        currentShopData,
      };
    case "SET_CART":
      return {
        ...state,
        cartData: [action.payload],
      };
    case "DELETE_WHOLE_CART":
      return {
        ...state,
        cartData: [],
      };
    case "DELETE_CART_ITEM":
      const { indexToDelete } = action.payload;
      const updatedCartData = state.cartData.filter(
        (_, index) => index !== indexToDelete
      );
      return {
        ...state,
        cartData: updatedCartData.flat(),
      };
    case "SET_MONEY":
      return {
        ...state,
        moneyData: { ...action.payload },
      };
    case "SET_OWNED_STUFF":
      return {
        ...state,
        ownedStuff: { ...action.payload },
      };
    case "CALCULATE_SUM":
      let getSumNumber = (index) =>
        action.payload.length > 0
          ? action.payload
              .map((cart) => cart.bottomPart.coinsGems[index])
              .reduce((a, b) => a + b)
          : "0";

      return {
        ...state,
        totalSum: {
          coins: getSumNumber(0),
          gems: getSumNumber(1),
        },
      };
    default:
      return state;
  }
};

export default shopReducer;
