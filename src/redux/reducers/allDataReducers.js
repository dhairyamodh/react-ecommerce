import { brandTypes, productTypes } from "../types";

const initialstate = {
  products: [],
  brands: [],
};

const allDataReducer = (state = initialstate, action) => {
  switch (action.type) {

    case productTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.data.data,
      };
    case brandTypes.GET_ALL_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default allDataReducer;
