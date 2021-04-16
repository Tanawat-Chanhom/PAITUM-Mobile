import env from "../util/server.json";
import axios from "axios";

export const createPost = async (body, restaurantId) => {
  return await axios.post(
    env.SERVER + "/restaurant/review/" + restaurantId,
    body
  );
};
