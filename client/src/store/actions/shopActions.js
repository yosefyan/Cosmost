export const SET_DATA = 'SET_DATA';
export const SET_CART = 'SET_CART';
export const DELETE_WHOLE_CART = 'DELETE_WHOLE_CART';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const SET_MONEY = 'SET_MONEY';
export const SET_OWNED_STUFF = 'SET_OWNED_STUFF';
export const CALCULATE_SUM = 'CALCULATE_SUM';

export const setData = (currentShopData) => ({
  type: SET_DATA,
  payload: { currentShopData },
});

export const setCart = (cartData) => ({
  type: SET_CART,
  payload: cartData,
});

export const deleteWholeCart = () => ({
  type: DELETE_WHOLE_CART,
});

export const deleteCartItem = (indexToDelete) => ({
  type: DELETE_CART_ITEM,
  payload: { indexToDelete },
});

export const setMoney = (moneyData) => ({
  type: SET_MONEY,
  payload: moneyData,
});

export const setOwnedStuff = (ownedStuff) => ({
  type: SET_OWNED_STUFF,
  payload: ownedStuff,
});

export const calculateSum = (cartData) => ({
  type: CALCULATE_SUM,
  payload: cartData,
});
