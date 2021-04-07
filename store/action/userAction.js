export const ACTION_NAME_LIST = {
  setToken: "SET_TOKEN",
};

export const setToken = (token) => {
  return {
    type: ACTION_NAME_LIST.setToken,
    token: token,
  };
};
