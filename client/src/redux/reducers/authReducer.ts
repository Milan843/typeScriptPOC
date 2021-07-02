import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
} from "../actions/types";

import { IUserRedux, actionTypes, IUser } from "../../utils/interfaces";
interface IAction {
  type: actionTypes;
  payload: IUser;
}

const initialState: IUserRedux = {
  isAuth: false,
  isLoading: false,
  user: null,
  token: localStorage.getItem("token"),
};

const userReducer = (state: IUserRedux = initialState, action: IAction) => {
  switch (action.type) {
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token || "");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
