import { brandTypes } from "../types";
import checkIfAsyncReqSuccess from "./checkIfAsyncReqSuccess";

export const getBrands = (cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "",
      errorMessage: "Failed to get brands",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: brandTypes.GET_ALL_BRANDS,
      payload: {
        request: {
          url: '/get-brands',
          method: "GET",
        },
      },
    });
};

export const addBrands = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Brand added successfully",
      errorMessage: "Failed to add Brand",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: brandTypes.CREATE_BRAND,
      payload: {
        request: {
          url: '/add-brands',
          method: "POST",
          data: data,
        },
      },
    });
};

export const deleteBrand = (data, cb, errorCb) => {
  return (dispatch) =>
    checkIfAsyncReqSuccess(dispatch, {
      successMessage: "Product deleted successfully",
      errorMessage: "Failed to delete product",
      enableMessage: true,
      cb: cb,
      errorCb: errorCb,
      type: brandTypes.DELETE_BRAND,
      payload: {
        request: {
          url: '/remove-brands',
          method: "DELETE",
          params: { id: data },
        },
      },
    });
};

