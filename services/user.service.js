import env from "../util/env.json";
import axios from "axios";

export const getUserProfile = async (userId) => {
  return await axios.get(env.SERVER + "/user/profile?userId=" + userId);
};

export const userFollowBetweenUser = async (body) => {
  return await axios.put(env.SERVER + "/user/follow", body);
};

export const register = async (body) => {
  return await axios.post(env.SERVER + "/user/register", body);
};
