export const SET_TOKEN = "SET_TOKEN";
export const SET_COIN = "SET_COIN";
export const LOGOUT = "LOGOUT";
export const SET_COUPON = "SET_COUPON";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token: token,
  };
};

export const setCoin = (coin) => {
  return {
    coin: coin,
    type: SET_COIN,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setCoupon = (coupon) => {
  return {
    coupon: coupon,
    type: SET_COUPON,
  };
};
