import removeToken from "../../helpers/removeToken";
import setToken from "../../helpers/setToken";
import { userTypes, authTypes } from "../types";

const initialstate = {
  isLogged: false,
  token: undefined,
  users: [],
};

const userReducer = (state = initialstate, action) => {
  const getData = () => action.payload.data;
  switch (action.type) {
    case authTypes.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };

    case authTypes.LOGIN_USER_SUCCESS:
      setToken(getData().token);
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        role: getData().user.role,
        name: getData().user.name,
        token: getData().token,
        ...getData().user,
      };

    case authTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };

    case authTypes.REGISTER_USER_SUCCESS:
      setToken(getData().token);
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        role: getData().user.role,
        name: getData().user.name,
        token: getData().token,
        ...getData().user,
      };

    case authTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };

    case userTypes.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLogged: true,
        isLoading: false,
        getDetailsLoading: false,
        role: getData().user.role,
        name: getData().user.name,
        error: undefined,
        ...getData().user,
      };

    case userTypes.GET_USER_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        getDetailsLoading: false,
        error: {
          message: action?.error?.response?.data?.message,
          status: "error",
        },
      };
    case userTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: getData()?.data,
      };


    case authTypes.LOGOUT_USER:
      console.log('logout');
      removeToken();
      return {
        isLogged: false,
      };
    default:
      return state;
  }
};

export default userReducer;
