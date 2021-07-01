import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootreducer = combineReducers({
  auth: authReducer,
  users: userReducer,
});

export default rootreducer;
export type IRootState = ReturnType<typeof rootreducer>;
