import { combineReducers } from "redux";

import authenReducer from "./authenReducer";
import userReduducer from "./userReducer";

export default index = combineReducers({
  authenReducer: authenReducer,
  userReduducer: userReduducer,
});
