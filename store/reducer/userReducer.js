import { ACTION_NAME_LIST } from "../action/userAction";

const initialState = {
  token: null,
};

export default authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_NAME_LIST.setToken:
      let token = action.token;
      return { ...state, token: token };

    default:
      return state;
  }
};
