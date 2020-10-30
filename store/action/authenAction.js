export const LOGIN = "LOGIN";

export const loginSuccess = (token) => {
  return {
    type: LOGIN,
    token: token,
  };
};
