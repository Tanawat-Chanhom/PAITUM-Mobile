import { SET_TOKEN, LOGOUT, SET_COIN } from "../action/authenAction";

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
    case SET_COIN:
      let coin = action.coin;
      let newState = state;
      newState.token.coin = coin;
      return newState;
    default:
      return state;
  }
};
