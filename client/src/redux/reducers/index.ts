import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
const rootreducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  error: errorReducer,
});

export default rootreducer;
export type IRootState = ReturnType<typeof rootreducer>;
