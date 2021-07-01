import {
    GET_USERS
  } from '../actions/types';
  
  import { actionTypes } from "../../utils/interfaces";
  
  interface IAction {
    type: actionTypes;
    payload: any;
  }
  
  const initialState: any = {
    users: null,
  };
  
  const userReducer= (state = initialState, action: IAction) => {
    switch (action.type) {
      case GET_USERS:
        return {
          users: [ ...action.payload ],
        };
      default:
        return state;
    }
  }
  
  export default userReducer