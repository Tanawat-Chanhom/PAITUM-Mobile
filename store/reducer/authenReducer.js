import {
  SET_TOKEN,
  LOGOUT,
  SET_COIN,
  SET_COUPON,
} from "../action/authenAction";

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
    case SET_COUPON:
      let coupon = action.coupon;
      let newCoupon = state;
      newCoupon.token.coupon = coupon;
      return newCoupon;
    default:
      return state;
  }
};
