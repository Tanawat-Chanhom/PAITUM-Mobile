import { SET_TOKEN, LOGOUT } from "../action/authenAction";

const initialState = {
  token: null,
};

export default authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      let token = action.token;
      return { ...state, token: token };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};
