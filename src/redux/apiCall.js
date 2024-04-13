import { makeRequest } from "../axios";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    logoutSuccess,
    updateSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await makeRequest.post("auth/login", user);
        const accessToken = res.data.accessToken;
        makeRequest.defaults.headers.common = { 'Authorization': `bearer ${accessToken}` }
        dispatch(loginSuccess(res.data));
        document.cookie = `session=${JSON.stringify(res.data)}; path=/;`;
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
    }
};

export const updateUser = async (dispatch, user) => {
    try {
        const res = await makeRequest.put("users", user);
        await dispatch(updateSuccess(res.data));
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (dispatch) => {
    dispatch(logoutSuccess());
};

