import { login, register } from "../utils/api";
import { makeRequest } from "../utils/axios";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    logoutSuccess,
    registerFailure,
    registerStart,
    registerSuccess,
    updateSuccess,
} from "./userRedux";

export const fetchLogin = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await login(user);
        const accessToken = res.data.accessToken;
        makeRequest.defaults.headers.common = { 'Authorization': `bearer ${accessToken}` }

        dispatch(loginSuccess(res.data));
        document.cookie = `session=${JSON.stringify(res.data)}; path=/;`;
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
        throw new Error(error.response.data.message);
    }
};

export const fetchRegister = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await register(user);
        dispatch(registerSuccess(res.data));
    } catch (error) {
        dispatch(registerFailure(error.response.data.message));
        throw new Error(error.response.data.message);
    }
};

export const fetchForgotPassword = async (dispatch, user) => {
    // TODO call api register
    // dispatch(registerStart());
    // try {
    //     const res = await makeRequest.post("auth/register", user);
    //     dispatch(registerSuccess(res.data));
    // } catch (error) {
    //     dispatch(registerFailure(error.response.data.message));
    //     throw new Error(error.response.data.message);
    // }
};

export const updateUser = async (dispatch, user) => {
    try {
        const res = await makeRequest.put("users", user);
        await dispatch(updateSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const fetchLogout = async (dispatch) => {
    document.cookie = "session=; path=/;"
    dispatch(logoutSuccess());
};
