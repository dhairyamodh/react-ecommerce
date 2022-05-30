import { authTypes, userTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const register = (data, cb, errorCb) => {
    return (dispatch) =>
        checkIfAsyncReqSuccess(dispatch, {
            successMessage: "User registered successfully",
            errorMessage: "Failed to register user",
            enableMessage: true,
            cb: cb,
            errorCb: errorCb,
            type: authTypes.REGISTER_USER,
            payload: {
                request: {
                    url: '/register',
                    method: "POST",
                    data: data
                },
            },
        });
};

export const login = (data, cb, errorCb) => {
    return (dispatch) =>
        checkIfAsyncReqSuccess(dispatch, {
            successMessage: "",
            errorMessage: "Failed to get products",
            enableMessage: true,
            cb: cb,
            errorCb: errorCb,
            type: authTypes.LOGIN_USER,
            payload: {
                request: {
                    url: '/login',
                    method: "POST",
                    data: data,
                },
            },
        });

};

export const getUserDetails = () => {
    return {
        type: userTypes.GET_USER_DETAILS,
        payload: {
            request: {
                method: "get",
                url: '/details',
            },
        },
    };
};

export const logout = () => {
    return {
        type: authTypes.LOGOUT_USER,
    }
}