import { ACTION_NAME_LIST } from "../action/userAction";

const initialState = {
  token: null,
  userId: null,
  coin: 0,
};

export default authenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_NAME_LIST.setUserId:
      let userId = action.id;
      return { ...state, userId: userId };

    case ACTION_NAME_LIST.setUserCoin:
      let coin = action.coin;
      return { ...state, coin: coin };

    case ACTION_NAME_LIST.logout:
      return { ...state, userId: null };

    default:
      return state;
  }
};
