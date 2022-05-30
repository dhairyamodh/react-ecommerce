import { cartTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const getCart = () => {
    return {
        type: cartTypes.GET_CART,
    }
};

export const addToCart = (data) => {
    return {
        type: cartTypes.ADD_TO_CART,
        payload: data
    }
};

export const removeFromCart = (data) => {
    return {
        type: cartTypes.REMOVE_FROM_CART,
        payload: data
    }
};

export const checkout = (data, cb, errorCb) => {
    return (dispatch) =>
        checkIfAsyncReqSuccess(dispatch, {
            successMessage: "Checkout successfully",
            errorMessage: "Failed to Checkout",
            enableMessage: true,
            cb: cb,
            errorCb: errorCb,
            type: cartTypes.CHECKOUT,
            payload: {
                request: {
                    url: '/checkout',
                    method: "POST",
                    data: data,
                },
            },
        });
};
