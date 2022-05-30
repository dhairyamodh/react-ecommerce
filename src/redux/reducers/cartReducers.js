import { cartTypes } from "../types";

const initialstate = {
  carts: [],
};

const cartReducer = (state = initialstate, action) => {
  switch (action.type) {

    case cartTypes.GET_CART:
      return {
        ...state,
        carts: state.carts
      };


    case cartTypes.ADD_TO_CART:
      const cartItems = { ...action.payload, quantity: 1, total: action.payload.price }

      const foundItem = state.carts.findIndex(c => c._id === action.payload._id)
      if (foundItem > -1) {
        if (state.carts[foundItem].quantity < action.payload.quantity) {
          state.carts[foundItem].quantity = parseInt(state.carts[foundItem].quantity) + 1;
          state.carts[foundItem].total = parseInt(state.carts[foundItem].quantity) * parseInt(state.carts[foundItem].price);
        }
      } else {
        state.carts = [...state.carts, cartItems]
      }
      return {
        ...state,
        carts: state.carts
      };

    case cartTypes.REMOVE_FROM_CART:
      const filter = state.carts.filter(f => f._id !== action.payload)
      return {
        ...state,
        carts: filter
      };

    case cartTypes.CHECKOUT_SUCCESS:
      return {
        ...state,
        carts: []
      };

    default:
      return state;
  }
};

export default cartReducer;
