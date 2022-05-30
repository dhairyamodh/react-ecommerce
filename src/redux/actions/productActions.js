import { productTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const getAllProducts = (cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "",
      errorMessage: "Failed to get products",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: productTypes.GET_ALL_PRODUCTS,
      payload: {
        request: {
          url: '/get-products',
          method: "GET",
        },
      },
    });
};

export const addProduct = (data, cb, errorCb) => {

  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Product added successfully",
      errorMessage: "Failed to add product",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: productTypes.CREATE_PRODUCT,
      payload: {
        request: {
          url: '/add-products',
          method: "POST",
          data: data,
        },
      },
    });
};


export const deleteProduct = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Product deleted successfully",
      errorMessage: "Failed to delete product",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: productTypes.DELETE_PRODUCT,
      payload: {
        request: {
          url: '/remove-products',
          method: "DELETE",
          params: { id: data },
        },
      },
    });
};

