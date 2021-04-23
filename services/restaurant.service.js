import env from "../util/env.json";
import axios from "axios";

export const getRestaurants = async () => {
  return await axios.get(env.SERVER + "/restaurant/all");
};

export const getRestaurantWithId = async (restaurantId) => {
  return await axios.get(env.SERVER + "/restaurant/" + restaurantId);
};

export const getNearRestaurants = async (body) => {
  return await axios.post(env.SERVER + "/restaurant/near", body);
};

export const putRestaurantFollow = async (body) => {
  return await axios.put(env.SERVER + "/user/follow/restaurant", body);
};

export const putRestaurantUnfollow = async (body) => {
  return await axios.put(env.SERVER + "/user/unfollow/restaurant", body);
};

export const redeemRestaurantCoupon = async (body) => {
  return await axios.put(env.SERVER + "/restaurant/redeem", body);
};

export const getRestaurantCoupon = async (restaurantId) => {
  return await axios.get(env.SERVER + "/restaurant/coupon/" + restaurantId);
};

export const getRestaurantPromotion = async (restaurantId) => {
  return await axios.get(env.SERVER + "/restaurant/promotion/" + restaurantId);
};
