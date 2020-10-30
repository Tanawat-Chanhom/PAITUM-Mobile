import { LOGIN } from "../action/authenAction";

const initialState = {
  isLogin: false,
  token: "",
  isLoading: false,
};

export default authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      break;

    default:
      return state;
      break;
  }
};
