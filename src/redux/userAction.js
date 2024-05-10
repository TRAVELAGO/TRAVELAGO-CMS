import {
  hotelRegister,
  login,
  register,
  resetPassword,
  sendEmail,
} from "../utils/api";
import { makeRequest } from "../utils/axios";
import { logoutHotel } from "./hotelRedux";
import {
  loginSuccess,
  logoutSuccess,
  onFailure,
  onStart,
  registerSuccess,
  sendEmailSuccess,
  updateSuccess,
} from "./userRedux";

export const fetchLogin = async (dispatch, user) => {
  dispatch(onStart());
  try {
    const res = await login(user);
    const accessToken = res.data.accessToken;
    makeRequest.defaults.headers.common = {
      Authorization: `bearer ${accessToken}`,
    };

    dispatch(
      loginSuccess({
        token: res.data,
        user: res.data.user,
        hotel: res.data.hotel,
      })
    );
    document.cookie = `session=${JSON.stringify(res.data)}; path=/;`;
  } catch (error) {
    dispatch(onFailure(error.response.data.message));
    throw new Error(error.response.data.message);
  }
};

export const fetchRegister = async (dispatch, user) => {
  dispatch(onStart());
  try {
    const res = await register(user);
    dispatch(registerSuccess({ user: res.data }));
  } catch (error) {
    dispatch(onFailure(error.response.data.message));
    throw new Error(error.response.data.message);
  }
};

export const fetchHotelRegister = async (dispatch, user) => {
  dispatch(onStart());
  try {
    const res = await hotelRegister(user);
    dispatch(registerSuccess({ user: res.data }));
  } catch (error) {
    dispatch(onFailure(error.response.data.message));
    throw new Error(error.response.data.message);
  }
};

export const fetchSendEmail = async (dispatch, email) => {
  dispatch(onStart());
  try {
    await sendEmail(email);
    dispatch(sendEmailSuccess());
  } catch (error) {
    dispatch(onFailure(error.response.data.message));
    throw new Error(error.response.data.message);
  }
};

export const fetchForgotPassword = async (dispatch, user) => {
  dispatch(onStart());
  try {
    await resetPassword(user);
    dispatch(sendEmailSuccess());
  } catch (error) {
    dispatch(onFailure(error.response.data.message));
    throw new Error(error.response.data.message);
  }
};

export const updateUser = async (dispatch, user) => {
  try {
    const res = await makeRequest.put("users", user);
    await dispatch(updateSuccess({ token: res.data, user: res.data.user }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogout = async (dispatch) => {
  document.cookie = "session=; path=/;";
  dispatch(logoutSuccess());
  dispatch(logoutHotel());
};
