import env from "../util/env.json";
import axios from "axios";

export const getUserProfile = async (userId) => {
  return await axios.get(env.SERVER + "/user/profile?userId=" + userId);
};

export const updateUserProfile = async (userId, body) => {
  return await axios.put(env.SERVER + "/user/profile/" + userId, body);
};

export const resetUserPassword = async (userId, body) => {
  return await axios.patch(env.SERVER + "/user/reset/" + userId, body);
};

export const userFollowBetweenUser = async (body) => {
  return await axios.put(env.SERVER + "/user/follow", body);
};

export const userUnfollowBetweenUser = async (body) => {
  return await axios.put(env.SERVER + "/user/unfollow", body);
};

export const register = async (body) => {
  return await axios.post(env.SERVER + "/user/register", body);
};

export const removeUser = async (userId) => {
  return await axios.delete(env.SERVER + "/user/delete/" + userId)
}
