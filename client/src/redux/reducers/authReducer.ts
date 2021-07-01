import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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
};

const userReducer = (state: IUserRedux = initialState, action: IAction) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...initialState,
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
    default:
      return state;
  }
};

export default userReducer;
