import env from "../util/server.json";
import axios from "axios";

export const getRestaurants = async () => {
  return await axios.get(env.SERVER + "/restaurant/all");
};

export const getNearRestaurants = async (body) => {
  return await axios.post(env.SERVER + "/restaurant/near", body);
};

export const getRestaurantFollow = async (body) => {
  return await axios.put(env.SERVER + "/restaurant/follow", body);
};
