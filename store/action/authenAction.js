export const SET_TOKEN = "SET_TOKEN";
export const LOGOUT = "LOGOUT";

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token: token,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
