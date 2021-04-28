import env from "../util/env.json";
import axios from "axios";

export const getPosts = async (userId) => {
  return await axios.get(env.SERVER + "/restaurant/feed/" + userId);
};

export const getPostById = async (postId) => {
  return await axios.get(env.SERVER + "/restaurant/review/" + postId);
};

export const createPost = async (body) => {
  return await axios.post(env.SERVER + "/restaurant/review", body);
};

export const deletePost = async (reviewId) => {
  return await axios.delete(env.SERVER + "/restaurant/reviews/" + reviewId);
};

export const likePost = async (body) => {
  return axios.put(env.SERVER + "/restaurant/like", body);
};

export const unlikePost = async (body) => {
  return axios.put(env.SERVER + "/restaurant/unlike", body);
};

export const sendCommentPost = async (body) => {
  return axios.post(env.SERVER + "/restaurant/comment", body);
};
