import env from "../util/env.json";
import axios from "axios";

export const getPosts = async (userId) => {
  return await axios.get(env.SERVER + "/restaurant/feed/" + userId);
};

export const createPost = async (body) => {
  return await axios.post(env.SERVER + "/restaurant/review", body);
};

export const deletePost = async (body) => {
  return;
};

export const likePost = async (body) => {
  return axios.put(env.SERVER + "/restaurant/like", body);
};

export const unlikePost = async (body) => {
  return axios.put(env.SERVER + "/restaurant/unlike", body);
};

export const getPostComments = async (body) => {
  return {
    data: [
      {
        avatar: "https://picsum.photos/200",
        id: "L6gDfZBYQ4dUcA8oSP5M",
        message: "อร่อยจริงๆ ครับ",
      },
      {
        avatar: "https://picsum.photos/300",
        id: "OfPQktW6mzGZ58B60lYD",
        message: "+1",
      },
      {
        avatar: "https://picsum.photos/400",
        id: "Q716nBcqJ72qq0n15LZ2",
        message: "ไม่ลองไม่รู้!!!",
      },
    ],
  };
};

export const sendPostComment = async (body) => {
  return {};
};
