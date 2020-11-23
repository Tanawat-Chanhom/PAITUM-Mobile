export const SET_TOKEN = "SET_TOKEN";
export const SET_COIN = "SET_COIN";
export const LOGOUT = "LOGOUT";

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
