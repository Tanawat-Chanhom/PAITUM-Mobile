import { combineReducers } from "redux";

import authenReducer from "./authenReducer";
import userReducer from "./userReducer";

export default index = combineReducers({
  authenReducer: authenReducer,
  userReducer: userReducer,
});
