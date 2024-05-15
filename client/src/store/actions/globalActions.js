export const SET_ERRORS = 'SET_ERRORS';
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: { errors },
});

export const toggleNavAction = (toggleNav) => ({
  type: TOGGLE_NAV,
  payload: { toggleNav },
});

export const openDialog = (dialogType) => ({
  type: OPEN_DIALOG,
  payload: { dialogType },
});

export const closeDialog = (dialogType) => ({
  type: CLOSE_DIALOG,
  payload: { dialogType },
});
