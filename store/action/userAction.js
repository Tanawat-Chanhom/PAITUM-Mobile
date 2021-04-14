export const ACTION_NAME_LIST = {
  setUserId: "SET_USER_ID",
  setUserCoin: "SET_USER_COIN",
};

export const setUserId = (userId) => {
  return {
    type: ACTION_NAME_LIST.setUserId,
    id: userId,
  };
};

export const setUserCoin = (coin) => {
  return {
    type: ACTION_NAME_LIST.setUserCoin,
    coin: coin,
  };
};
