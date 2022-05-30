import { combineReducers } from "redux";
import userReducer from "./userReducer";
import allDataReducer from "./allDataReducers";
import cartReducer from "./cartReducers";
import snackReducer from "./snackReducer";

export default combineReducers({
  all: allDataReducer,
  user: userReducer,
  cart: cartReducer,
  snack: snackReducer,
});
