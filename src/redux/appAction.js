import { onFailure, onStart, onSuccess } from "./appRedux";
import { onReset } from "./userRedux";

export const setFetchStart = () => async (dispatch) => {
  dispatch(onStart());
};

export const setFetchSuccess = () => async (dispatch) => {
  dispatch(onSuccess());
};

export const setFetchFailure = (error) => async (dispatch) => {
  dispatch(onFailure(error));
};

export const resetFetch = () => async (dispatch) => {
  dispatch(onSuccess());
  dispatch(onReset());
};

export const withLoading = (func) => async (dispatch) => {
  dispatch(onStart());
  try {
    await func();
    dispatch(onSuccess());
  } catch (error) {
    dispatch(onFailure(error.response.data.message));
  }
};
