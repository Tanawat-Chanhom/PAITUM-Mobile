export const LOGIN = "LOGIN";
export const ALERT = "ALERT";

export const loginSuccess = (token) => {
  return {
    type: LOGIN,
    token: token,
  };
};

export const alert = (state) => {
  return {
    type: ALERT,
    state: false,
  };
};
