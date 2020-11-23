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
      return { ...state, coin: coin };
    default:
      return state;
  }
};
