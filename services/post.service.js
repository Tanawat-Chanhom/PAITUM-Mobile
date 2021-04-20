import env from "../util/server.json";
import axios from "axios";

export const createPost = async (body, restaurantId) => {
  return await axios.post(
    env.SERVER + "/restaurant/review/" + restaurantId,
    body
  );
};

export const deletePost = async (body) => {
  return;
};

export const likedPost = async (body) => {
  return {};
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
