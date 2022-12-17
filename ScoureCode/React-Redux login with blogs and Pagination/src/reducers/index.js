import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import blogReducer from "./blogReducer";

export default combineReducers({
  auth,
  message,
  blogReducer,
});
