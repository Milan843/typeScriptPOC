import { GET_USERS, SET_ACTIVE_USER, DELETE_USER } from "../actions/types";

import { actionTypes } from "../../utils/interfaces";

interface IAction {
  type: actionTypes;
  payload: any;
}

const initialState: any = {
  users: null,
  loading: false,
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: { ...action.payload },
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user: any) => user._id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
